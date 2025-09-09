const bcrypt = require('bcryptjs');
const { query } = require('../config/database');

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);
    await query(`
      INSERT INTO users (email, password, first_name, last_name, role, created_at, updated_at)
      VALUES ('admin@lunio.com', $1, 'Admin', 'User', 'admin', NOW(), NOW())
      ON CONFLICT (email) DO NOTHING
    `, [hashedPassword]);

    // Create categories
    const categories = [
      { name: 'Electronics', description: 'Electronic devices and accessories' },
      { name: 'Clothing', description: 'Fashion and apparel' },
      { name: 'Home & Garden', description: 'Home improvement and garden supplies' },
      { name: 'Sports & Outdoors', description: 'Sports equipment and outdoor gear' },
      { name: 'Books', description: 'Books and educational materials' }
    ];

    for (const category of categories) {
      await query(`
        INSERT INTO categories (name, description, created_at, updated_at)
        VALUES ($1, $2, NOW(), NOW())
        ON CONFLICT DO NOTHING
      `, [category.name, category.description]);
    }

    // Create sample products
    const products = [
      {
        name: 'Wireless Bluetooth Headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        price: 129.99,
        category_id: 1,
        brand: 'TechBrand',
        sku: 'WBH-001',
        stock_quantity: 50
      },
      {
        name: 'Smart Watch Series 5',
        description: 'Advanced smartwatch with health monitoring features',
        price: 299.99,
        category_id: 1,
        brand: 'TechBrand',
        sku: 'SW-005',
        stock_quantity: 25
      },
      {
        name: 'Cotton T-Shirt',
        description: 'Comfortable 100% cotton t-shirt',
        price: 19.99,
        category_id: 2,
        brand: 'FashionCo',
        sku: 'CT-001',
        stock_quantity: 100
      },
      {
        name: 'Gaming Mechanical Keyboard',
        description: 'RGB mechanical keyboard for gaming',
        price: 149.99,
        category_id: 1,
        brand: 'GameTech',
        sku: 'GMK-001',
        stock_quantity: 30
      },
      {
        name: 'Laptop Stand Adjustable',
        description: 'Ergonomic adjustable laptop stand',
        price: 39.99,
        category_id: 1,
        brand: 'OfficeGear',
        sku: 'LSA-001',
        stock_quantity: 75
      }
    ];

    for (const product of products) {
      await query(`
        INSERT INTO products (name, description, price, category_id, brand, sku, stock_quantity, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
        ON CONFLICT (sku) DO NOTHING
      `, [product.name, product.description, product.price, product.category_id, product.brand, product.sku, product.stock_quantity]);
    }

    // Create sample customers
    const customers = [
      {
        first_name: 'John',
        last_name: 'Smith',
        email: 'john.smith@email.com',
        phone: '+1-555-0123',
        address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA'
        }
      },
      {
        first_name: 'Sarah',
        last_name: 'Johnson',
        email: 'sarah.johnson@email.com',
        phone: '+1-555-0124',
        address: {
          street: '456 Oak Ave',
          city: 'Los Angeles',
          state: 'CA',
          zipCode: '90210',
          country: 'USA'
        }
      },
      {
        first_name: 'Mike',
        last_name: 'Davis',
        email: 'mike.davis@email.com',
        phone: '+1-555-0125',
        address: {
          street: '789 Pine St',
          city: 'Chicago',
          state: 'IL',
          zipCode: '60601',
          country: 'USA'
        }
      }
    ];

    for (const customer of customers) {
      await query(`
        INSERT INTO customers (first_name, last_name, email, phone, address, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
        ON CONFLICT (email) DO NOTHING
      `, [customer.first_name, customer.last_name, customer.email, customer.phone, JSON.stringify(customer.address)]);
    }

    console.log('✅ Database seeding completed successfully!');
    console.log('📧 Admin login: admin@lunio.com');
    console.log('🔑 Admin password: admin123');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

// Run seeding if called directly
if (require.main === module) {
  seedDatabase().then(() => {
    process.exit(0);
  });
}

module.exports = { seedDatabase };