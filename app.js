const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/config/swagger');
const userRoutes = require('./src/routes/user.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

// ✅ Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

module.exports = app;
