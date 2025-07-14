const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./src/config/swagger');
const userRoutes = require('./src/routes/user.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/users', userRoutes);

// Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// 404
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

module.exports = app;
