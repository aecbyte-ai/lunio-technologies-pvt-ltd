const Joi = require('joi');

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation error',
        details: error.details.map(detail => detail.message)
      });
    }
    next();
  };
};

// Validation schemas
const schemas = {
  register: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    role: Joi.string().valid('admin', 'manager', 'staff').default('staff')
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),

  product: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().positive().required(),
    category_id: Joi.number().integer().positive().required(),
    brand: Joi.string().optional(),
    sku: Joi.string().required(),
    stock_quantity: Joi.number().integer().min(0).required(),
    status: Joi.string().valid('active', 'inactive', 'draft').default('active'),
    weight: Joi.number().positive().optional(),
    dimensions: Joi.object({
      length: Joi.number().positive(),
      width: Joi.number().positive(),
      height: Joi.number().positive()
    }).optional()
  }),

  customer: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().optional(),
    address: Joi.object({
      street: Joi.string(),
      city: Joi.string(),
      state: Joi.string(),
      zipCode: Joi.string(),
      country: Joi.string()
    }).optional()
  }),

  order: Joi.object({
    customer_id: Joi.number().integer().positive().required(),
    items: Joi.array().items(
      Joi.object({
        product_id: Joi.number().integer().positive().required(),
        quantity: Joi.number().integer().positive().required(),
        price: Joi.number().positive().required()
      })
    ).min(1).required(),
    shipping_address: Joi.object({
      street: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      zipCode: Joi.string().required(),
      country: Joi.string().required()
    }).required(),
    billing_address: Joi.object({
      street: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      zipCode: Joi.string().required(),
      country: Joi.string().required()
    }).optional()
  }),

  kycApplication: Joi.object({
    user_id: Joi.number().integer().positive().required(),
    document_type: Joi.string().valid('passport', 'driving_license', 'national_id').required(),
    document_number: Joi.string().required(),
    full_name: Joi.string().required(),
    date_of_birth: Joi.date().required(),
    address: Joi.object({
      street: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      zipCode: Joi.string().required(),
      country: Joi.string().required()
    }).required()
  })
};

module.exports = {
  validateRequest,
  schemas
};