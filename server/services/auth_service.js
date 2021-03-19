const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const databaseService = require('./database_service');
const cryptoService = require('./crypto_service');

const PRIVATE_KEY = fs.readFileSync(path.join(__dirname, '..', process.env.PRIVATE_KEY));

async function refreshToken(req, res) {
    try {
        const jwtAccount = req.body.decodedAccount;

        let dbAccount = await databaseService.getAccount(jwtAccount);

        delete dbAccount.password;
        delete dbAccount.blocked;
        const JWT = createJWT(dbAccount);
        console.log(JWT)
        //Send JWT back
        res.status(200).json(JWT);
    } catch (e) {
        console.error(e.stack);
        res.status(401).send({
            error: e
        });
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
        console.error(e.stack);
        res.status(401).send({
            error: e
        });
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