const router = require('express').Router()

const authMiddleware = require('../middlewares/auth');
const rightsMiddleware = require('../middlewares/rights');
const authController = require('../controllers/auth');

/**
 * Endpoint for authentication.
 * post: log in 
 * put: update JWT token
 */
router.route("/login")
    .post(authController.login)
    .put(authMiddleware.checkIfAuthenticated, rightsMiddleware.checkIfAccountAvailable, authController.refreshToken);

module.exports = router;