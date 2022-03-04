import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AccountService from '../services/account.service';
import Util from '../utils/utils';

const util = new Util();

class AccountController {
  static async getAllAccounts(req, res) {
    try {
      const allAccounts = await AccountService.getAllAccounts();
      if (allAccounts.length > 0) {
        util.setSuccess(200, 'Accounts retrieved', allAccounts);
      } else {
        util.setSuccess(200, 'No accounts found');
      }
      return util.send(res);
    } catch (error) {
      console.error({ error });
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addAccount(req, res) {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    try {
      const newAccount = {
        username,
        email,
        password: hashedPassword,
        wallet_balance: 1000,
      };
      const createdAccount = await AccountService.addAccount(newAccount);
      util.setSuccess(201, 'Account added successfully', createdAccount);
      return util.send(res);
    } catch (error) {
      console.error({ error });
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async authenticateAccount(req, res) {
    const { email, password } = req.body;
    const account = await AccountService.getAccount(email);
    if (!account) {
      util.setError('404', 'Invalid email or password');
      return util.send(res);
    }
    const validPassword = await bcrypt.compare(password, account.password);
    if (!validPassword) {
      util.setError('404', 'Invalid email or password');
      return util.send(res);
    }
    const token = jwt.sign({ account }, process.env.JWT_SECRET, {
      expiresIn: '18000s',
    });
    util.setSuccess(200, 'Authentication successful', { token, account });
    return util.send(res);
  }
}

export default AccountController;
