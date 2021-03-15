const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const databaseService = require('./database_service');
const cryptoService = require('./crypto_service');

const PRIVATE_KEY = fs.readFileSync(path.join(__dirname, '..', process.env.PRIVATE_KEY));

async function refreshToken(req, res) {
    try {
        const jwtUser = req.body.decodedUser;

        let dbUser = await databaseService.getUser(jwtUser);

        delete dbUser.password;
        delete dbUser.blocked;
        const jwtBearerToken = jwt.sign(dbUser, PRIVATE_KEY, {
            algorithm: 'RS256',
            expiresIn: process.env.JWT_DURATION,
        });
        //Send JWT back
        res.status(200).json({
            idToken: jwtBearerToken,
            expiresIn: process.env.JWT_DURATION,
            user: dbUser
        });
    } catch (e) {
        // send status 401 Unauthorized
        res.status(401).send({
            error: "No match"
        });
    }
}

async function login(req, res) {
    try {
        const requestUser = req.body.user;

        let dbUser = await databaseService.getUser(requestUser);
        if (!dbUser.blocked && cryptoService.comparePasswords(requestUser.password, dbUser.password)) {
            delete dbUser.password;
            delete dbUser.blocked;
            const jwtBearerToken = jwt.sign(dbUser, PRIVATE_KEY, {
                algorithm: 'RS256',
                expiresIn: process.env.JWT_DURATION,
            });
            //Send JWT back
            res.status(200).json({
                idToken: jwtBearerToken,
                expiresIn: process.env.JWT_DURATION,
                user: dbUser
            });
        } else {
            // send status 401 Unauthorized
            res.status(401).send({
                error: "No match"
            });
        }
    } catch (e) {
        // send status 401 Unauthorized
        res.status(401).send({
            error: "No match"
        });
    }
}

module.exports = {
    refreshToken,
    login
};