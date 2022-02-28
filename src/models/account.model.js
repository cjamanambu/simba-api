import { uuid } from 'uuidv4';
import Sequelize from 'sequelize';
import { sequelize } from '../database';

// module.exports = (sequelize, DataTypes) => {};

const AccountModel = sequelize.define(
  'Account',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: uuid(),
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    full_name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    wallet_balance: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {}
);
AccountModel.associate = () => {
  // associations can be defined here
};
// return Account;
export default AccountModel;
