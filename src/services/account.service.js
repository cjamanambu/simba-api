// import database from '../models';
import Sequelize from 'sequelize';
import AccountModel from '../models/account.model';

const { Op } = Sequelize;

class AccountService {
  static async getAllAccounts() {
    try {
      return await AccountModel.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addAccount(newAccount) {
    try {
      return await AccountModel.create(newAccount);
    } catch (error) {
      throw error;
    }
  }

  static async getAccount(param) {
    try {
      return await AccountModel.findOne({
        where: {
          [Op.or]: [{ email: param }, { username: param }],
        },
      });
    } catch (error) {
      throw error;
    }
  }
}

export default AccountService;
