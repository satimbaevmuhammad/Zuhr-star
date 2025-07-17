const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

let swaggerSpec;
try {
  swaggerSpec = require('./src/config/swagger');
} catch (error) {
  console.error('Swagger config xatosi:', error);
  process.exit(1);
}

const userRoutes = require('./src/routes/user.routes');
const infoUserRoutes = require('./src/routes/infoUser.routes');

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/users', userRoutes);
app.use('/api/info-users', infoUserRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

// Swagger docs
try {
  app.use('/docs', (req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;");
    next();
  }, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
} catch (error) {
  console.error('Swagger UI xatosi:', error);
}

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// 404 handler
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

module.exports = app;