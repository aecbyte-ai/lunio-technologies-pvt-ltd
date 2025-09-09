const express = require('express');
const { query } = require('../config/database');
const { authenticateToken, requireRole } = require('../middleware/auth');
const { validateRequest, schemas } = require('../middleware/validation');

const router = express.Router();

// Get all customers with pagination and filters
router.get('/', authenticateToken, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      status = '',
      sortBy = 'created_at',
      sortOrder = 'DESC'
    } = req.query;

    const offset = (page - 1) * limit;
    
    let whereClause = 'WHERE 1=1';
    const queryParams = [];
    let paramCount = 0;

    if (search) {
      paramCount++;
      whereClause += ` AND (first_name ILIKE $${paramCount} OR last_name ILIKE $${paramCount} OR email ILIKE $${paramCount})`;
      queryParams.push(`%${search}%`);
    }

    if (status) {
      paramCount++;
      whereClause += ` AND status = $${paramCount}`;
      queryParams.push(status);
    }

    // Get total count
    const countResult = await query(`SELECT COUNT(*) as total FROM customers ${whereClause}`, queryParams);
    const total = parseInt(countResult.rows[0].total);

    // Get customers
    paramCount++;
    queryParams.push(limit);
    paramCount++;
    queryParams.push(offset);

    const customersQuery = `
      SELECT 
        c.*,
        COUNT(o.id) as total_orders,
        COALESCE(SUM(o.total_amount), 0) as total_spent,
        MAX(o.created_at) as last_order_date
      FROM customers c
      LEFT JOIN orders o ON c.id = o.customer_id
      ${whereClause}
      GROUP BY c.id
      ORDER BY c.${sortBy} ${sortOrder}
      LIMIT $${paramCount - 1} OFFSET $${paramCount}
    `;

    const result = await query(customersQuery, queryParams);

    res.json({
      status: 'success',
      data: {
        customers: result.rows,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get customers error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// Get single customer
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const customerResult = await query(`
      SELECT 
        c.*,
        COUNT(o.id) as total_orders,
        COALESCE(SUM(o.total_amount), 0) as total_spent,
        MAX(o.created_at) as last_order_date
      FROM customers c
      LEFT JOIN orders o ON c.id = o.customer_id
      WHERE c.id = $1
      GROUP BY c.id
    `, [id]);

    if (customerResult.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Customer not found'
      });
    }

    // Get recent orders
    const ordersResult = await query(`
      SELECT id, order_number, status, total_amount, created_at
      FROM orders
      WHERE customer_id = $1
      ORDER BY created_at DESC
      LIMIT 5
    `, [id]);

    res.json({
      status: 'success',
      data: {
        customer: customerResult.rows[0],
        recentOrders: ordersResult.rows
      }
    });
  } catch (error) {
    console.error('Get customer error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// Create customer
router.post('/', authenticateToken, requireRole(['admin', 'manager']), validateRequest(schemas.customer), async (req, res) => {
  try {
    const { firstName, lastName, email, phone, address } = req.body;

    const result = await query(`
      INSERT INTO customers (
        first_name, last_name, email, phone, address, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
      RETURNING *
    `, [firstName, lastName, email, phone, JSON.stringify(address)]);

    res.status(201).json({
      status: 'success',
      message: 'Customer created successfully',
      data: {
        customer: result.rows[0]
      }
    });
  } catch (error) {
    console.error('Create customer error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// Update customer
router.put('/:id', authenticateToken, requireRole(['admin', 'manager']), validateRequest(schemas.customer), async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, phone, address } = req.body;

    const result = await query(`
      UPDATE customers SET
        first_name = $1, last_name = $2, email = $3, phone = $4,
        address = $5, updated_at = NOW()
      WHERE id = $6
      RETURNING *
    `, [firstName, lastName, email, phone, JSON.stringify(address), id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Customer not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Customer updated successfully',
      data: {
        customer: result.rows[0]
      }
    });
  } catch (error) {
    console.error('Update customer error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// Delete customer
router.delete('/:id', authenticateToken, requireRole(['admin']), async (req, res) => {
  try {
    const { id } = req.params;

    const result = await query('DELETE FROM customers WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Customer not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Customer deleted successfully'
    });
  } catch (error) {
    console.error('Delete customer error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

module.exports = router;