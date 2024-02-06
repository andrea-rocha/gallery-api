import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  "gallery-db",
  "postgres",
  "admin",
  {
    host: "localhost",
    dialect: "postgres",
  }
);
