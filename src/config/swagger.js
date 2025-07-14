const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CRM API',
      version: '1.0.0',
      description: 'CRM system backend API documentation',
    },
    servers: [
      {
        url: 'https://zuhr-star-4.onrender.com', // Render deployment URL (keyin yangilaysiz)
      },
    ],
  },
  apis: ['./routes/*.js'], // Swagger uchun JSDoc yozilgan fayllar yo'li
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
