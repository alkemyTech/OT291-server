const swaggerConfig = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library API - ONG',
      version: '1.0.0',
      description: 'A simple Library API',
    },
    servers: [
      {
        url: 'http://localhost:3000/',
        description: 'V1 ONG API',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js', './docs/*.yaml'],
};

module.exports = swaggerConfig;
