const express = require('express');
const { upload } = require('../config/cloudinary');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Single image upload
router.post('/image', authenticateToken, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'No image file provided'
      });
    }

    res.json({
      status: 'success',
      message: 'Image uploaded successfully',
      data: {
        url: req.file.path,
        publicId: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.bytes,
        format: req.file.format
      }
    });
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Image upload failed'
    });
  }
});

// Multiple images upload
router.post('/images', authenticateToken, upload.array('images', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'No image files provided'
      });
    }

    const uploadedImages = req.files.map(file => ({
      url: file.path,
      publicId: file.filename,
      originalName: file.originalname,
      size: file.bytes,
      format: file.format
    }));

    res.json({
      status: 'success',
      message: `${req.files.length} images uploaded successfully`,
      data: {
        images: uploadedImages
      }
    });
  } catch (error) {
    console.error('Multiple images upload error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Images upload failed'
    });
  }
});

module.exports = router;