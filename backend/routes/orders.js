const express = require('express');
const { query } = require('../config/database');
const { authenticateToken, requireRole } = require('../middleware/auth');
const { validateRequest, schemas } = require('../middleware/validation');

const router = express.Router();

// Get all orders with pagination and filters
router.get('/', authenticateToken, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      status = '',
      dateFrom = '',
      dateTo = '',
      sortBy = 'created_at',
      sortOrder = 'DESC'
    } = req.query;

    const offset = (page - 1) * limit;
    
    let whereClause = 'WHERE 1=1';
    const queryParams = [];
    let paramCount = 0;

    if (search) {
      paramCount++;
      whereClause += ` AND (o.order_number ILIKE $${paramCount} OR c.first_name ILIKE $${paramCount} OR c.last_name ILIKE $${paramCount})`;
      queryParams.push(`%${search}%`);
    }

    if (status) {
      paramCount++;
      whereClause += ` AND o.status = $${paramCount}`;
      queryParams.push(status);
    }

    if (dateFrom) {
      paramCount++;
      whereClause += ` AND o.created_at >= $${paramCount}`;
      queryParams.push(dateFrom);
    }

    if (dateTo) {
      paramCount++;
      whereClause += ` AND o.created_at <= $${paramCount}`;
      queryParams.push(dateTo);
    }

    // Get total count
    const countQuery = `
      SELECT COUNT(*) as total
      FROM orders o
      LEFT JOIN customers c ON o.customer_id = c.id
      ${whereClause}
    `;
    const countResult = await query(countQuery, queryParams);
    const total = parseInt(countResult.rows[0].total);

    // Get orders
    paramCount++;
    queryParams.push(limit);
    paramCount++;
    queryParams.push(offset);

    const ordersQuery = `
      SELECT 
        o.id, o.order_number, o.status, o.total_amount, o.created_at, o.updated_at,
        o.shipping_address, o.billing_address,
        c.first_name, c.last_name, c.email, c.phone,
        COUNT(oi.id) as item_count
      FROM orders o
      LEFT JOIN customers c ON o.customer_id = c.id
      LEFT JOIN order_items oi ON o.id = oi.order_id
      ${whereClause}
      GROUP BY o.id, c.first_name, c.last_name, c.email, c.phone
      ORDER BY o.${sortBy} ${sortOrder}
      LIMIT $${paramCount - 1} OFFSET $${paramCount}
    `;

    const result = await query(ordersQuery, queryParams);

    res.json({
      status: 'success',
      data: {
        orders: result.rows,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// Get single order
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const orderResult = await query(`
      SELECT 
        o.*,
        c.first_name, c.last_name, c.email, c.phone
      FROM orders o
      LEFT JOIN customers c ON o.customer_id = c.id
      WHERE o.id = $1
    `, [id]);

    if (orderResult.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Order not found'
      });
    }

    // Get order items
    const itemsResult = await query(`
      SELECT 
        oi.*,
        p.name as product_name, p.sku
      FROM order_items oi
      LEFT JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = $1
    `, [id]);

    res.json({
      status: 'success',
      data: {
        order: orderResult.rows[0],
        items: itemsResult.rows
      }
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// Create order
router.post('/', authenticateToken, requireRole(['admin', 'manager']), validateRequest(schemas.order), async (req, res) => {
  try {
    const { customer_id, items, shipping_address, billing_address } = req.body;

    // Calculate total amount
    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Create order
    const orderResult = await query(`
      INSERT INTO orders (
        order_number, customer_id, status, total_amount,
        shipping_address, billing_address, created_at, updated_at
      ) VALUES ($1, $2, 'pending', $3, $4, $5, NOW(), NOW())
      RETURNING *
    `, [orderNumber, customer_id, totalAmount, JSON.stringify(shipping_address), JSON.stringify(billing_address || shipping_address)]);

    const order = orderResult.rows[0];

    // Create order items
    for (const item of items) {
      await query(`
        INSERT INTO order_items (order_id, product_id, quantity, price, created_at)
        VALUES ($1, $2, $3, $4, NOW())
      `, [order.id, item.product_id, item.quantity, item.price]);

      // Update product stock
      await query(`
        UPDATE products SET stock_quantity = stock_quantity - $1 WHERE id = $2
      `, [item.quantity, item.product_id]);
    }

    res.status(201).json({
      status: 'success',
      message: 'Order created successfully',
      data: {
        order
      }
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// Update order status
router.patch('/:id/status', authenticateToken, requireRole(['admin', 'manager']), async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid status'
      });
    }

    const result = await query(`
      UPDATE orders SET status = $1, updated_at = NOW()
      WHERE id = $2
      RETURNING *
    `, [status, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Order not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Order status updated successfully',
      data: {
        order: result.rows[0]
      }
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

module.exports = router;