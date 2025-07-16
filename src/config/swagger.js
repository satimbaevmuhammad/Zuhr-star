const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Zuhr Star CRM',
      version: '1.0.0',
      description: 'API lar toplami',
    },
    servers: [
      {
        url: 'https://zuhr-star-4.onrender.com',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Bu commentlar yozilgan route papkasi
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec; // Faqat `spec` ni export qilamiz
