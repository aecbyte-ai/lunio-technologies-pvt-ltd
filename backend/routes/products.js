const express = require('express');
const { query } = require('../config/database');
const { authenticateToken, requireRole } = require('../middleware/auth');
const { validateRequest, schemas } = require('../middleware/validation');

const router = express.Router();

// Get all products with pagination and filters
router.get('/', authenticateToken, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      category = '',
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
      whereClause += ` AND (p.name ILIKE $${paramCount} OR p.sku ILIKE $${paramCount})`;
      queryParams.push(`%${search}%`);
    }

    if (category) {
      paramCount++;
      whereClause += ` AND p.category_id = $${paramCount}`;
      queryParams.push(category);
    }

    if (status) {
      paramCount++;
      whereClause += ` AND p.status = $${paramCount}`;
      queryParams.push(status);
    }

    // Get total count
    const countQuery = `
      SELECT COUNT(*) as total
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ${whereClause}
    `;
    const countResult = await query(countQuery, queryParams);
    const total = parseInt(countResult.rows[0].total);

    // Get products
    paramCount++;
    queryParams.push(limit);
    paramCount++;
    queryParams.push(offset);

    const productsQuery = `
      SELECT 
        p.id, p.name, p.description, p.price, p.sku, p.stock_quantity,
        p.status, p.brand, p.weight, p.dimensions, p.created_at, p.updated_at,
        c.name as category_name,
        COALESCE(
          JSON_AGG(
            CASE WHEN pi.id IS NOT NULL THEN
              JSON_BUILD_OBJECT('id', pi.id, 'url', pi.image_url, 'alt_text', pi.alt_text)
            END
          ) FILTER (WHERE pi.id IS NOT NULL), '[]'
        ) as images
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN product_images pi ON p.id = pi.product_id
      ${whereClause}
      GROUP BY p.id, c.name
      ORDER BY p.${sortBy} ${sortOrder}
      LIMIT $${paramCount - 1} OFFSET $${paramCount}
    `;

    const result = await query(productsQuery, queryParams);

    res.json({
      status: 'success',
      data: {
        products: result.rows,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// Get single product
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await query(`
      SELECT 
        p.id, p.name, p.description, p.price, p.sku, p.stock_quantity,
        p.status, p.brand, p.weight, p.dimensions, p.created_at, p.updated_at,
        c.name as category_name, c.id as category_id,
        COALESCE(
          JSON_AGG(
            CASE WHEN pi.id IS NOT NULL THEN
              JSON_BUILD_OBJECT('id', pi.id, 'url', pi.image_url, 'alt_text', pi.alt_text)
            END
          ) FILTER (WHERE pi.id IS NOT NULL), '[]'
        ) as images
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN product_images pi ON p.id = pi.product_id
      WHERE p.id = $1
      GROUP BY p.id, c.name, c.id
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found'
      });
    }

    res.json({
      status: 'success',
      data: {
        product: result.rows[0]
      }
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// Create product
router.post('/', authenticateToken, requireRole(['admin', 'manager']), validateRequest(schemas.product), async (req, res) => {
  try {
    const {
      name, description, price, category_id, brand, sku,
      stock_quantity, status, weight, dimensions
    } = req.body;

    const result = await query(`
      INSERT INTO products (
        name, description, price, category_id, brand, sku,
        stock_quantity, status, weight, dimensions, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW())
      RETURNING *
    `, [name, description, price, category_id, brand, sku, stock_quantity, status, weight, JSON.stringify(dimensions)]);

    res.status(201).json({
      status: 'success',
      message: 'Product created successfully',
      data: {
        product: result.rows[0]
      }
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// Update product
router.put('/:id', authenticateToken, requireRole(['admin', 'manager']), validateRequest(schemas.product), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name, description, price, category_id, brand, sku,
      stock_quantity, status, weight, dimensions
    } = req.body;

    const result = await query(`
      UPDATE products SET
        name = $1, description = $2, price = $3, category_id = $4,
        brand = $5, sku = $6, stock_quantity = $7, status = $8,
        weight = $9, dimensions = $10, updated_at = NOW()
      WHERE id = $11
      RETURNING *
    `, [name, description, price, category_id, brand, sku, stock_quantity, status, weight, JSON.stringify(dimensions), id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Product updated successfully',
      data: {
        product: result.rows[0]
      }
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// Delete product
router.delete('/:id', authenticateToken, requireRole(['admin', 'manager']), async (req, res) => {
  try {
    const { id } = req.params;

    const result = await query('DELETE FROM products WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// Add product image
router.post('/:id/images', authenticateToken, requireRole(['admin', 'manager']), async (req, res) => {
  try {
    const { id } = req.params;
    const { image_url, alt_text } = req.body;

    // Check if product exists
    const productCheck = await query('SELECT id FROM products WHERE id = $1', [id]);
    if (productCheck.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found'
      });
    }

    const result = await query(`
      INSERT INTO product_images (product_id, image_url, alt_text, created_at)
      VALUES ($1, $2, $3, NOW())
      RETURNING *
    `, [id, image_url, alt_text]);

    res.status(201).json({
      status: 'success',
      message: 'Product image added successfully',
      data: {
        image: result.rows[0]
      }
    });
  } catch (error) {
    console.error('Add product image error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// Delete product image
router.delete('/:id/images/:imageId', authenticateToken, requireRole(['admin', 'manager']), async (req, res) => {
  try {
    const { id, imageId } = req.params;

    const result = await query(
      'DELETE FROM product_images WHERE id = $1 AND product_id = $2 RETURNING id',
      [imageId, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Product image not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Product image deleted successfully'
    });
  } catch (error) {
    console.error('Delete product image error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

module.exports = router;