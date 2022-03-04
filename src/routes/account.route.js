import { Router } from 'express';
import AccountController from '../controllers/account.controller';
import {
  validateAccess,
  validateRequest,
  validateUsernameExists,
  validateEmailExists,
} from '../middlewares/validate.middleware';
import { accountValidation, accountAuthValidation } from '../utils/schemas';

const router = Router();

router.get('/', validateAccess(), AccountController.getAllAccounts);
router.post(
  '/',
  validateRequest(accountValidation),
  validateEmailExists(),
  validateUsernameExists(),
  AccountController.addAccount
);
router.post(
  '/auth',
  validateRequest(accountAuthValidation),
  AccountController.authenticateAccount
);

export default router;
