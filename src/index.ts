import app from './app';
import { sequelize } from './database/database';
import './models/gallery';
import { swaggerDocs as V1SwaggerDocs } from './documentation/swagger';
import 'reflect-metadata';

async function main() {
  try {
    await sequelize.sync({ alter: true });
    const port = app.get('port');
    app.listen(port);
    console.log('Server on Port', port);
    V1SwaggerDocs(app, port);
  } catch (error) {
    console.error('Unable to connect to the database: ', error);
  }
}

main();

