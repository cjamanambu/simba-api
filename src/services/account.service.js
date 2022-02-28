// import database from '../models';
import AccountModel from '../models/account.model';
import Sequelize from 'sequelize';
const Op = Sequelize.Op;

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
}

export default AccountService;
