const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const databaseService = require('./database_service');
const cryptoService = require('./crypto_service');


const PRIVATE_KEY = fs.readFileSync(path.join(__dirname, '..', process.env.PRIVATE_KEY));

function refreshToken(req, res) {
    databaseService.getUser(req.body.decodedUser)
        .then(
            user => {
                delete user.password;
                delete user.blocked;
                const jwtBearerToken = jwt.sign(user, PRIVATE_KEY, {
                    algorithm: 'RS256',
                    expiresIn: process.env.JWT_DURATION,
                });

                //Send JWT back
                res.status(200).json({
                    idToken: jwtBearerToken,
                    expiresIn: process.env.JWT_DURATION,
                    user: user
                });
            }
        ).catch(err => {
            // send status 401 Unauthorized
            res.status(401).send({
                error: "No match"
            });
        });
}

function login(req, res) {
    const passwordToCheck = req.body.user.password;
    databaseService.getUser(req.body.user)
        .then(user => {
            if (!user.blocked && cryptoService.comparePasswords(passwordToCheck, user.password)) {
                delete user.password;
                delete user.blocked;
                const jwtBearerToken = jwt.sign(user, PRIVATE_KEY, {
                    algorithm: 'RS256',
                    expiresIn: process.env.JWT_DURATION,
                });
                //Send JWT back
                res.status(200).json({
                    idToken: jwtBearerToken,
                    expiresIn: process.env.JWT_DURATION,
                    user: user
                });
            } else {
                // send status 401 Unauthorized
                res.status(401).send({
                    error: "No match"
                });
            }
        }).catch(err => {
            // send status 401 Unauthorized
            res.status(401).send({
                error: "No match"
            });
        });
}

module.exports = { refreshToken, login };