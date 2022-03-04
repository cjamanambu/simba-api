import jwt from 'jsonwebtoken';
import Util from '../utils/utils';
import AccountService from '../services/account.service';

const util = new Util();

export function validateAccess() {
  return async (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
      util.setError(401, 'Access denied');
      return util.send(res);
    }
    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
      console.log(req.user);
      return next();
    } catch (error) {
      console.error({ error });
      util.setError(403, 'Invalid token');
      return util.send(res);
    }
  };
}

export function validateRequest(schema) {
  return async (req, res, next) => {
    const response = schema.validate(req.body);
    if (response.error) {
      util.setError(400, response.error.message);
      return util.send(res);
    }
    return next();
  };
}

export function validateEmailExists() {
  return async (req, res, next) => {
    const { email } = req.body;
    const emailExists = await AccountService.getAccount(email);
    if (emailExists) {
      util.setError(400, 'This email already exists');
      return util.send(res);
    }
    return next();
  };
}

export function validateUsernameExists() {
  return async (req, res, next) => {
    const { username } = req.body;
    const usernameExists = await AccountService.getAccount(username);
    if (usernameExists) {
      util.setError(400, 'This username already exists');
      return util.send(res);
    }
    return next();
  };
}
