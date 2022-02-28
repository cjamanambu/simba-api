import Sequelize from 'sequelize';
import configs from './config';

const env = process.env.NODE_ENV || 'development';
const config = configs[env];
console.log('current environment: ', env);

export const sequelize = new Sequelize(config.url, config);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to db', err);
  });
