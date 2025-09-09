const express = require('express');
const { query } = require('../config/database');
const { authenticateToken, requireRole } = require('../middleware/auth');

const router = express.Router();

// Get all reviews with pagination and filters
router.get('/', authenticateToken, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      rating = '',
      status = '',
      productId = '',
      sortBy = 'created_at',
      sortOrder = 'DESC'
    } = req.query;

    const offset = (page - 1) * limit;
    
    let whereClause = 'WHERE 1=1';
    const queryParams = [];
    let paramCount = 0;

    if (rating) {
      paramCount++;
      whereClause += ` AND r.rating = $${paramCount}`;
      queryParams.push(rating);
    }

    if (status) {
      paramCount++;
      whereClause += ` AND r.status = $${paramCount}`;
      queryParams.push(status);
    }

    if (productId) {
      paramCount++;
      whereClause += ` AND r.product_id = $${paramCount}`;
      queryParams.push(productId);
    }

    // Get total count
    const countQuery = `
      SELECT COUNT(*) as total
      FROM reviews r
      LEFT JOIN products p ON r.product_id = p.id
      LEFT JOIN customers c ON r.customer_id = c.id
      ${whereClause}
    `;
    const countResult = await query(countQuery, queryParams);
    const total = parseInt(countResult.rows[0].total);

    // Get reviews
    paramCount++;
    queryParams.push(limit);
    paramCount++;
    queryParams.push(offset);

    const reviewsQuery = `
      SELECT 
        r.*,
        p.name as product_name, p.sku,
        c.first_name, c.last_name, c.email
      FROM reviews r
      LEFT JOIN products p ON r.product_id = p.id
      LEFT JOIN customers c ON r.customer_id = c.id
      ${whereClause}
      ORDER BY r.${sortBy} ${sortOrder}
      LIMIT $${paramCount - 1} OFFSET $${paramCount}
    `;

    const result = await query(reviewsQuery, queryParams);

    res.json({
      status: 'success',
      data: {
        reviews: result.rows,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// Get single review
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await query(`
      SELECT 
        r.*,
        p.name as product_name, p.sku,
        c.first_name, c.last_name, c.email
      FROM reviews r
      LEFT JOIN products p ON r.product_id = p.id
      LEFT JOIN customers c ON r.customer_id = c.id
      WHERE r.id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Review not found'
      });
    }

    res.json({
      status: 'success',
      data: {
        review: result.rows[0]
      }
    });
  } catch (error) {
    console.error('Get review error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// Update review status
router.patch('/:id/status', authenticateToken, requireRole(['admin', 'manager']), async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'approved', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid status'
      });
    }

    const result = await query(`
      UPDATE reviews SET status = $1, updated_at = NOW()
      WHERE id = $2
      RETURNING *
    `, [status, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Review not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Review status updated successfully',
      data: {
        review: result.rows[0]
      }
    });
  } catch (error) {
    console.error('Update review status error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// Add admin reply to review
router.post('/:id/reply', authenticateToken, requireRole(['admin', 'manager']), async (req, res) => {
  try {
    const { id } = req.params;
    const { reply } = req.body;

    if (!reply || reply.trim().length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Reply content is required'
      });
    }

    const result = await query(`
      UPDATE reviews SET 
        admin_reply = $1, 
        replied_by = $2,
        replied_at = NOW(),
        updated_at = NOW()
      WHERE id = $3
      RETURNING *
    `, [reply.trim(), req.user.id, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Review not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Reply added successfully',
      data: {
        review: result.rows[0]
      }
    });
  } catch (error) {
    console.error('Add review reply error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// Get review statistics
router.get('/stats/overview', authenticateToken, async (req, res) => {
  try {
    const { period = '30' } = req.query;

    // Overall stats
    const overallResult = await query(`
      SELECT 
        COUNT(*) as total_reviews,
        AVG(rating) as average_rating,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_reviews,
        COUNT(CASE WHEN admin_reply IS NOT NULL THEN 1 END) as replied_reviews
      FROM reviews
      WHERE created_at >= NOW() - INTERVAL '${period} days'
    `);

    // Rating distribution
    const ratingResult = await query(`
      SELECT 
        rating,
        COUNT(*) as count
      FROM reviews
      WHERE created_at >= NOW() - INTERVAL '${period} days'
      GROUP BY rating
      ORDER BY rating DESC
    `);

    // Reviews trend
    const trendResult = await query(`
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as review_count,
        AVG(rating) as avg_rating
      FROM reviews
      WHERE created_at >= NOW() - INTERVAL '7 days'
      GROUP BY DATE(created_at)
      ORDER BY date
    `);

    res.json({
      status: 'success',
      data: {
        overview: overallResult.rows[0],
        ratingDistribution: ratingResult.rows,
        trend: trendResult.rows
      }
    });
  } catch (error) {
    console.error('Get review stats error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

module.exports = router;