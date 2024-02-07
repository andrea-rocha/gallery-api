import express from 'express';

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Metadata info about API
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'Gallery API',
            version: '1.0.0',
            description: 'API built in NODEJS with Typescript',
            contact: {
                name: 'Andrea Rocha', 
                email: 'andreroch07@gmail.com',
            },
            license: {
                name: 'Apache 2.0',
                url: 'https://www.apache.org/licenses/LICENSE-2.0'
            },
        },
    },
    apis:['./src/routes/index.ts', './src/database/database.ts'],
};

// Docs en formato JSON
const swaggerSpec = swaggerJSDoc(options);

// Function to configure our Swagger documents
export const swaggerDocs = (app: express.Application, port: number) => {
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('/api/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    console.log(`Version 1 Docs are available at http://localhost:${port}/api/docs`);
};



