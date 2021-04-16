const router = require('express').Router()
const accountController = require('../controllers/account');
const authMiddleware = require('../middlewares/auth');
const rightsMiddleware = require('../middlewares/rights');

/**
 * Endpoint to reset the password from the link received by email.
 */
router.route("/accounts/reset")
  .post(accountController.resetPasswordFromEmail);

/**
 * Endpoint to request password reset.
 */
router.route("/accounts/reset/request")
  .post(accountController.requestPasswordReset);

/**
 * Endpoint to validate hash sent by email.
 */
router.route("/accounts/reset/validation")
  .post(accountController.validatePasswordResetHash);


/**
 * Endpoint for account operations.
 * get: get all accounts
 * post: create account
 * put: update account
 * delete: delete account
 */
router.route('/accounts')
  .get(authMiddleware.checkIfAuthenticated, rightsMiddleware.checkIfFromAdmin, rightsMiddleware.checkIfAccountAvailable, accountController.getAccounts)
  .post(accountController.createAccount)
  .put(authMiddleware.checkIfAuthenticated, rightsMiddleware.checkIfUpdatesItselfOrAdmin, rightsMiddleware.checkIfAccountAvailable, accountController.updateAccount)
  .delete(authMiddleware.checkIfAuthenticated, rightsMiddleware.checkIfUpdatesItselfOrAdmin, rightsMiddleware.checkIfAccountAvailable, accountController.deleteAccount);

module.exports = router;