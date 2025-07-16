const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/config/swagger'); // ⚠️ TO‘G‘RI IMPORT

const userRoutes = require('./src/routes/user.routes');

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/users', userRoutes);

// ✅ Swagger ni `/docs` routega ulang
app.use('/docs', (req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;");
    next();
}, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 404 handler
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

module.exports = app;
