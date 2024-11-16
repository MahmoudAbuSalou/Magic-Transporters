import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Docs',
      version: '1.0.0',
      description: 'API documentation for Task in Node.js',
    },
  },
  apis: [path.resolve(__dirname, '../routes/*.ts')], // Adjust path to your TypeScript route files
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
