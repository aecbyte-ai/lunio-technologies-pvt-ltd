const express = require('express');
const { query } = require('../config/database');
const { authenticateToken, requireRole } = require('../middleware/auth');
const { validateRequest, schemas } = require('../middleware/validation');
const { upload } = require('../config/cloudinary');

const router = express.Router();

// Get all KYC applications with pagination and filters
router.get('/', authenticateToken, requireRole(['admin', 'manager']), async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status = '',
      search = '',
      sortBy = 'created_at',
      sortOrder = 'DESC'
    } = req.query;

    const offset = (page - 1) * limit;
    
    let whereClause = 'WHERE 1=1';
    const queryParams = [];
    let paramCount = 0;

    if (status) {
      paramCount++;
      whereClause += ` AND k.status = $${paramCount}`;
      queryParams.push(status);
    }

    if (search) {
      paramCount++;
      whereClause += ` AND (k.full_name ILIKE $${paramCount} OR k.document_number ILIKE $${paramCount} OR u.email ILIKE $${paramCount})`;
      queryParams.push(`%${search}%`);
    }

    // Get total count
    const countQuery = `
      SELECT COUNT(*) as total
      FROM kyc_applications k
      LEFT JOIN users u ON k.user_id = u.id
      ${whereClause}
    `;
    const countResult = await query(countQuery, queryParams);
    const total = parseInt(countResult.rows[0].total);

    // Get KYC applications
    paramCount++;
    queryParams.push(limit);
    paramCount++;
    queryParams.push(offset);

    const kycQuery = `
      SELECT 
        k.*,
        u.email, u.first_name, u.last_name
      FROM kyc_applications k
      LEFT JOIN users u ON k.user_id = u.id
      ${whereClause}
      ORDER BY k.${sortBy} ${sortOrder}
      LIMIT $${paramCount - 1} OFFSET $${paramCount}
    `;

    const result = await query(kycQuery, queryParams);

    res.json({
      status: 'success',
      data: {
        applications: result.rows,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get KYC applications error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// Get single KYC application
router.get('/:id', authenticateToken, requireRole(['admin', 'manager']), async (req, res) => {
  try {
    const { id } = req.params;

    const result = await query(`
      SELECT 
        k.*,
        u.email, u.first_name, u.last_name
      FROM kyc_applications k
      LEFT JOIN users u ON k.user_id = u.id
      WHERE k.id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'KYC application not found'
      });
    }

    res.json({
      status: 'success',
      data: {
        application: result.rows[0]
      }
    });
  } catch (error) {
    console.error('Get KYC application error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// Submit KYC application
router.post('/', authenticateToken, upload.fields([
  { name: 'document_front', maxCount: 1 },
  { name: 'document_back', maxCount: 1 },
  { name: 'selfie', maxCount: 1 }
]), validateRequest(schemas.kycApplication), async (req, res) => {
  try {
    const {
      user_id, document_type, document_number, full_name,
      date_of_birth, address
    } = req.body;

    // Check if user already has a pending or approved application
    const existingApp = await query(
      'SELECT id, status FROM kyc_applications WHERE user_id = $1 AND status IN ($2, $3)',
      [user_id, 'pending', 'approved']
    );

    if (existingApp.rows.length > 0) {
      return res.status(400).json({
        status: 'error',
        message: 'User already has a pending or approved KYC application'
      });
    }

    // Get uploaded file URLs
    const documentFront = req.files['document_front'] ? req.files['document_front'][0].path : null;
    const documentBack = req.files['document_back'] ? req.files['document_back'][0].path : null;
    const selfie = req.files['selfie'] ? req.files['selfie'][0].path : null;

    if (!documentFront || !selfie) {
      return res.status(400).json({
        status: 'error',
        message: 'Document front image and selfie are required'
      });
    }

    const documents = {
      document_front: documentFront,
      document_back: documentBack,
      selfie: selfie
    };

    const result = await query(`
      INSERT INTO kyc_applications (
        user_id, document_type, document_number, full_name,
        date_of_birth, address, documents, status, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, 'pending', NOW(), NOW())
      RETURNING *
    `, [user_id, document_type, document_number, full_name, date_of_birth, JSON.stringify(address), JSON.stringify(documents)]);

    res.status(201).json({
      status: 'success',
      message: 'KYC application submitted successfully',
      data: {
        application: result.rows[0]
      }
    });
  } catch (error) {
    console.error('Submit KYC application error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// Update KYC application status
router.patch('/:id/status', authenticateToken, requireRole(['admin', 'manager']), async (req, res) => {
  try {
    const { id } = req.params;
    const { status, rejection_reason } = req.body;

    const validStatuses = ['pending', 'approved', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid status'
      });
    }

    if (status === 'rejected' && !rejection_reason) {
      return res.status(400).json({
        status: 'error',
        message: 'Rejection reason is required when rejecting application'
      });
    }

    const result = await query(`
      UPDATE kyc_applications SET 
        status = $1, 
        rejection_reason = $2,
        reviewed_by = $3,
        reviewed_at = NOW(),
        updated_at = NOW()
      WHERE id = $4
      RETURNING *
    `, [status, rejection_reason, req.user.id, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'KYC application not found'
      });
    }

    res.json({
      status: 'success',
      message: `KYC application ${status} successfully`,
      data: {
        application: result.rows[0]
      }
    });
  } catch (error) {
    console.error('Update KYC status error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// Get KYC statistics
router.get('/stats/overview', authenticateToken, requireRole(['admin', 'manager']), async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending,
        COUNT(CASE WHEN status = 'approved' THEN 1 END) as approved,
        COUNT(CASE WHEN status = 'rejected' THEN 1 END) as rejected
      FROM kyc_applications
    `);

    res.json({
      status: 'success',
      data: {
        stats: result.rows[0]
      }
    });
  } catch (error) {
    console.error('Get KYC stats error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

module.exports = router;