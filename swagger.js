const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'WebDev Forms API',
    description: 'API to handle form submits from web developer page'
  },
  host: 'webdev-backend-n0v3.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
