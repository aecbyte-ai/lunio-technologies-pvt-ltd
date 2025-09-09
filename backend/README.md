# E-commerce Admin Panel Backend

A robust Node.js backend API for the e-commerce admin panel with PostgreSQL database and Cloudinary image storage.

## Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **Product Management**: CRUD operations for products with image upload
- **Order Management**: Complete order lifecycle management
- **Customer Management**: Customer profiles and analytics
- **KYC Verification**: Document upload and verification system
- **Reviews Management**: Product reviews and admin responses
- **Analytics**: Comprehensive business analytics and reporting
- **Image Upload**: Cloudinary integration for image storage
- **Database**: PostgreSQL with proper indexing and relationships

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Image Storage**: Cloudinary
- **Authentication**: JWT
- **Validation**: Joi
- **Security**: Helmet, CORS, Rate Limiting
- **File Upload**: Multer with Cloudinary storage

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- Cloudinary account

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment Setup**:
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your configuration:
   ```env
   # Database
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=ecommerce_admin
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   
   # JWT
   JWT_SECRET=your_super_secret_jwt_key_here
   
   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

3. **Database Setup**:
   ```bash
   # Create database tables
   npm run migrate
   
   # Seed with sample data
   npm run seed
   ```

4. **Start the server**:
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

### Products
- `GET /api/products` - Get all products (with pagination/filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `POST /api/products/:id/images` - Add product image
- `DELETE /api/products/:id/images/:imageId` - Delete product image

### Orders
- `GET /api/orders` - Get all orders (with pagination/filters)
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create order
- `PATCH /api/orders/:id/status` - Update order status

### Customers
- `GET /api/customers` - Get all customers (with pagination/filters)
- `GET /api/customers/:id` - Get single customer
- `POST /api/customers` - Create customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

### KYC Verification
- `GET /api/kyc` - Get all KYC applications
- `GET /api/kyc/:id` - Get single KYC application
- `POST /api/kyc` - Submit KYC application (with file upload)
- `PATCH /api/kyc/:id/status` - Update KYC status
- `GET /api/kyc/stats/overview` - Get KYC statistics

### Reviews
- `GET /api/reviews` - Get all reviews (with pagination/filters)
- `GET /api/reviews/:id` - Get single review
- `PATCH /api/reviews/:id/status` - Update review status
- `POST /api/reviews/:id/reply` - Add admin reply
- `GET /api/reviews/stats/overview` - Get review statistics

### Analytics
- `GET /api/analytics/dashboard` - Dashboard analytics
- `GET /api/analytics/sales` - Sales analytics
- `GET /api/analytics/customers` - Customer analytics
- `GET /api/analytics/products` - Product analytics

### File Upload
- `POST /api/upload/image` - Upload single image
- `POST /api/upload/images` - Upload multiple images

### User Management (Admin only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get single user
- `PUT /api/users/:id` - Update user
- `PATCH /api/users/:id/password` - Change user password
- `DELETE /api/users/:id` - Delete user

## Database Schema

### Core Tables
- **users**: System users with role-based access
- **categories**: Product categories with hierarchical support
- **products**: Product catalog with variants and inventory
- **product_images**: Product images stored in Cloudinary
- **customers**: Customer profiles and information
- **orders**: Order management with status tracking
- **order_items**: Individual items within orders
- **reviews**: Product reviews and ratings
- **kyc_applications**: KYC verification documents
- **return_orders**: Return and refund management

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-based Access**: Admin, Manager, Staff roles
- **Rate Limiting**: API rate limiting to prevent abuse
- **Input Validation**: Joi schema validation
- **SQL Injection Protection**: Parameterized queries
- **CORS Protection**: Configurable CORS policies
- **Helmet Security**: Security headers
- **Password Hashing**: bcrypt with salt rounds

## File Upload

Images are uploaded to Cloudinary with:
- **Automatic optimization**: Quality and format optimization
- **Size limits**: 5MB per file
- **Format validation**: Only image files allowed
- **Transformation**: Automatic resizing and optimization
- **CDN delivery**: Fast global content delivery

## Error Handling

Comprehensive error handling with:
- **Structured responses**: Consistent error format
- **Validation errors**: Detailed validation messages
- **Database errors**: Proper constraint violation handling
- **File upload errors**: Clear upload error messages
- **Authentication errors**: Secure auth error responses

## Default Admin Account

After running the seed script:
- **Email**: admin@lunio.com
- **Password**: admin123

## Development

```bash
# Install dependencies
npm install

# Run in development mode with auto-reload
npm run dev

# Run database migrations
npm run migrate

# Seed database with sample data
npm run seed
```

## Production Deployment

1. Set `NODE_ENV=production`
2. Use a process manager like PM2
3. Set up proper database backups
4. Configure reverse proxy (nginx)
5. Set up SSL certificates
6. Monitor logs and performance

## API Response Format

All API responses follow this structure:

```json
{
  "status": "success|error",
  "message": "Response message",
  "data": {
    // Response data
  }
}
```

## Pagination

List endpoints support pagination:

```json
{
  "status": "success",
  "data": {
    "items": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 10,
      "totalItems": 100,
      "itemsPerPage": 10
    }
  }
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.