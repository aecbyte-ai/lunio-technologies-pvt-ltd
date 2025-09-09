const express = require('express');
const { query } = require('../config/database');
const { authenticateToken, requireRole } = require('../middleware/auth');

const router = express.Router();

// Get dashboard analytics
router.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    const { period = '30' } = req.query; // days

    // Total revenue
    const revenueResult = await query(`
      SELECT COALESCE(SUM(total_amount), 0) as total_revenue
      FROM orders 
      WHERE status IN ('delivered', 'completed') 
      AND created_at >= NOW() - INTERVAL '${period} days'
    `);

    // Total orders
    const ordersResult = await query(`
      SELECT COUNT(*) as total_orders
      FROM orders 
      WHERE created_at >= NOW() - INTERVAL '${period} days'
    `);

    // Total customers
    const customersResult = await query(`
      SELECT COUNT(*) as total_customers
      FROM customers 
      WHERE created_at >= NOW() - INTERVAL '${period} days'
    `);

    // Total products
    const productsResult = await query(`
      SELECT COUNT(*) as total_products
      FROM products 
      WHERE status = 'active'
    `);

    // Revenue trend (last 7 days)
    const revenueTrendResult = await query(`
      SELECT 
        DATE(created_at) as date,
        COALESCE(SUM(total_amount), 0) as revenue
      FROM orders 
      WHERE status IN ('delivered', 'completed')
      AND created_at >= NOW() - INTERVAL '7 days'
      GROUP BY DATE(created_at)
      ORDER BY date
    `);

    // Order status distribution
    const orderStatusResult = await query(`
      SELECT 
        status,
        COUNT(*) as count
      FROM orders 
      WHERE created_at >= NOW() - INTERVAL '${period} days'
      GROUP BY status
    `);

    // Top selling products
    const topProductsResult = await query(`
      SELECT 
        p.name,
        p.sku,
        SUM(oi.quantity) as total_sold,
        SUM(oi.quantity * oi.price) as total_revenue
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      JOIN orders o ON oi.order_id = o.id
      WHERE o.created_at >= NOW() - INTERVAL '${period} days'
      AND o.status IN ('delivered', 'completed')
      GROUP BY p.id, p.name, p.sku
      ORDER BY total_sold DESC
      LIMIT 10
    `);

    res.json({
      status: 'success',
      data: {
        summary: {
          totalRevenue: parseFloat(revenueResult.rows[0].total_revenue),
          totalOrders: parseInt(ordersResult.rows[0].total_orders),
          totalCustomers: parseInt(customersResult.rows[0].total_customers),
          totalProducts: parseInt(productsResult.rows[0].total_products)
        },
        revenueTrend: revenueTrendResult.rows,
        orderStatus: orderStatusResult.rows,
        topProducts: topProductsResult.rows
      }
    });
  } catch (error) {
    console.error('Get dashboard analytics error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// Get sales analytics
router.get('/sales', authenticateToken, async (req, res) => {
  try {
    const { period = '30', groupBy = 'day' } = req.query;

    let dateFormat;
    let interval;

    switch (groupBy) {
      case 'hour':
        dateFormat = 'YYYY-MM-DD HH24:00:00';
        interval = '24 hours';
        break;
      case 'day':
        dateFormat = 'YYYY-MM-DD';
        interval = `${period} days`;
        break;
      case 'week':
        dateFormat = 'YYYY-"W"WW';
        interval = `${period * 7} days`;
        break;
      case 'month':
        dateFormat = 'YYYY-MM';
        interval = `${period} months`;
        break;
      default:
        dateFormat = 'YYYY-MM-DD';
        interval = `${period} days`;
    }

    const salesResult = await query(`
      SELECT 
        TO_CHAR(created_at, '${dateFormat}') as period,
        COUNT(*) as order_count,
        COALESCE(SUM(total_amount), 0) as revenue,
        COALESCE(AVG(total_amount), 0) as avg_order_value
      FROM orders 
      WHERE status IN ('delivered', 'completed')
      AND created_at >= NOW() - INTERVAL '${interval}'
      GROUP BY TO_CHAR(created_at, '${dateFormat}')
      ORDER BY period
    `);

    res.json({
      status: 'success',
      data: {
        sales: salesResult.rows
      }
    });
  } catch (error) {
    console.error('Get sales analytics error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// Get customer analytics
router.get('/customers', authenticateToken, async (req, res) => {
  try {
    const { period = '30' } = req.query;

    // Customer acquisition
    const acquisitionResult = await query(`
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as new_customers
      FROM customers 
      WHERE created_at >= NOW() - INTERVAL '${period} days'
      GROUP BY DATE(created_at)
      ORDER BY date
    `);

    // Customer lifetime value
    const clvResult = await query(`
      SELECT 
        c.id,
        c.first_name,
        c.last_name,
        c.email,
        COUNT(o.id) as total_orders,
        COALESCE(SUM(o.total_amount), 0) as lifetime_value
      FROM customers c
      LEFT JOIN orders o ON c.id = o.customer_id AND o.status IN ('delivered', 'completed')
      GROUP BY c.id, c.first_name, c.last_name, c.email
      HAVING COUNT(o.id) > 0
      ORDER BY lifetime_value DESC
      LIMIT 20
    `);

    // Customer segments
    const segmentsResult = await query(`
      SELECT 
        CASE 
          WHEN total_spent >= 1000 THEN 'High Value'
          WHEN total_spent >= 500 THEN 'Medium Value'
          WHEN total_spent > 0 THEN 'Low Value'
          ELSE 'No Purchase'
        END as segment,
        COUNT(*) as customer_count
      FROM (
        SELECT 
          c.id,
          COALESCE(SUM(o.total_amount), 0) as total_spent
        FROM customers c
        LEFT JOIN orders o ON c.id = o.customer_id AND o.status IN ('delivered', 'completed')
        GROUP BY c.id
      ) customer_totals
      GROUP BY segment
    `);

    res.json({
      status: 'success',
      data: {
        acquisition: acquisitionResult.rows,
        topCustomers: clvResult.rows,
        segments: segmentsResult.rows
      }
    });
  } catch (error) {
    console.error('Get customer analytics error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// Get product analytics
router.get('/products', authenticateToken, async (req, res) => {
  try {
    const { period = '30' } = req.query;

    // Product performance
    const performanceResult = await query(`
      SELECT 
        p.id,
        p.name,
        p.sku,
        p.price,
        p.stock_quantity,
        COALESCE(SUM(oi.quantity), 0) as units_sold,
        COALESCE(SUM(oi.quantity * oi.price), 0) as revenue,
        COUNT(DISTINCT o.customer_id) as unique_buyers
      FROM products p
      LEFT JOIN order_items oi ON p.id = oi.product_id
      LEFT JOIN orders o ON oi.order_id = o.id AND o.status IN ('delivered', 'completed')
        AND o.created_at >= NOW() - INTERVAL '${period} days'
      GROUP BY p.id, p.name, p.sku, p.price, p.stock_quantity
      ORDER BY units_sold DESC
      LIMIT 20
    `);

    // Low stock products
    const lowStockResult = await query(`
      SELECT id, name, sku, stock_quantity, price
      FROM products 
      WHERE stock_quantity <= 10 AND status = 'active'
      ORDER BY stock_quantity ASC
      LIMIT 10
    `);

    // Category performance
    const categoryResult = await query(`
      SELECT 
        c.name as category_name,
        COUNT(DISTINCT p.id) as product_count,
        COALESCE(SUM(oi.quantity), 0) as units_sold,
        COALESCE(SUM(oi.quantity * oi.price), 0) as revenue
      FROM categories c
      LEFT JOIN products p ON c.id = p.category_id
      LEFT JOIN order_items oi ON p.id = oi.product_id
      LEFT JOIN orders o ON oi.order_id = o.id AND o.status IN ('delivered', 'completed')
        AND o.created_at >= NOW() - INTERVAL '${period} days'
      GROUP BY c.id, c.name
      ORDER BY revenue DESC
    `);

    res.json({
      status: 'success',
      data: {
        performance: performanceResult.rows,
        lowStock: lowStockResult.rows,
        categories: categoryResult.rows
      }
    });
  } catch (error) {
    console.error('Get product analytics error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

module.exports = router;