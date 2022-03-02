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
      console.log(error);
      util.setError(400, error);
      return util.send(res);
    }
  }
}

export default AccountController;
