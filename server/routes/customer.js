const router = require('express').Router()

const authMiddleware = require('../middlewares/auth');
const rightsMiddleware = require('../middlewares/rights');
const customerController = require('../controllers/customer');
const recaptchaController = require('../controllers/recaptcha');

/**
 * Endpoint for customer operations.
 * get: get all customer created by user
 * post: send customer direct to sap
 */
router.route("/customers")
    .get(authMiddleware.checkIfAuthenticated, rightsMiddleware.checkEmail, rightsMiddleware.checkIfAccountAvailable, customerController.getCustomers)
    .post(authMiddleware.checkIfAuthenticated, rightsMiddleware.checkIfAccountAvailable, customerController.sendCustomerDirect);

/**
 * Enpoint to request new customers from application.
 */
router.route("/customers/request")
    .post(authMiddleware.checkIfAuthenticated, rightsMiddleware.checkIfAccountAvailable, customerController.sendCustomerRequest);

/**
 * Endpoint to get email confirmations.
 */
router.route("/customers/confirm")
    .get(customerController.confirmCustomerRequest);

/**
 * Endpoint to get recaptcha token from the client.
 */
router.route('/customers/recaptcha')
    .post(authMiddleware.checkIfAuthenticated, rightsMiddleware.checkIfAccountAvailable, recaptchaController.validateRecaptcha);

module.exports = router;