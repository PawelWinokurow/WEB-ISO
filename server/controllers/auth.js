const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const errorHandler = require('../middlewares/error');
const databaseService = require('../services/database');
const cryptoService = require('../services/crypto');
const PRIVATE_KEY = fs.readFileSync(path.join(process.cwd(), process.env.PRIVATE_KEY));

async function refreshToken(req, res) {
    try {
        const jwtAccount = req.body.decodedAccount;

        let dbAccount = await databaseService.getAccount(jwtAccount);

        delete dbAccount.password;
        delete dbAccount.blocked;
        const JWT = createJWT(dbAccount);
        //Send JWT back
        res.status(200).json(JWT);
    } catch (e) {
        errorHandler.unknownErrorResponse(e, 401);
    }
}

async function login(req, res) {
    try {
        const requestAccount = req.body.account;
        let dbAccount = await databaseService.getAccount(requestAccount);
        if (dbAccount && !dbAccount.blocked && cryptoService.comparePasswords(requestAccount.password, dbAccount.password)) {
            delete dbAccount.password;
            delete dbAccount.blocked;
            const JWT = createJWT(dbAccount);
            //Send JWT back
            res.status(200).json(JWT);
        } else {
            res.json({
                error: `IDINC`
            })
        }
    } catch (e) {
        errorHandler.unknownErrorResponse(e, 401);
    }
}

function createJWT(account) {
    const jwtBearerToken = jwt.sign(account, PRIVATE_KEY, {
        algorithm: 'RS256',
        expiresIn: process.env.JWT_DURATION,
    });
    const JWT = {
        idToken: jwtBearerToken,
        expiresIn: process.env.JWT_DURATION,
        account
    };
    return JWT;
}

module.exports = {
    refreshToken,
    createJWT,
    login
};