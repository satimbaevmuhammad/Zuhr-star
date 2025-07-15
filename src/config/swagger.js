const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'JWT bilan API',
      version: '1.0.0',
      description: 'JWT autentifikatsiya bilan Express API',
    },
    servers: [
      {
        url: 'https://zuhr-star-4.onrender.com', // Render'dagi URL
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Swagger commentlar qaerda yozilganini ko'rsatadi
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = swaggerDocs;
