import {uuid} from "uuidv4";

module.exports = {
  up: async (queryInterface, Sequelize) => await queryInterface.createTable('Accounts', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: uuid()
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      full_name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      wallet_balance: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    }),
  down: async(queryInterface, Sequelize) =>
    await queryInterface.dropTable('Accounts')
};