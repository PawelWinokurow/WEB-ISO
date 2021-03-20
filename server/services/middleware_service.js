const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const databaseService = require('./database_service');

const PUBLIC_KEY = fs.readFileSync(path.join(__dirname, '..', process.env.PUBLIC_KEY));

function checkIfAuthenticated(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const jwtBearerToken = authHeader.split(' ')[1];
        jwt.verify(jwtBearerToken, PUBLIC_KEY, {
            algorithm: ['RS256']
        }, (err, account) => {
            if (err) {
                console.error(err.stack);
                return res.sendStatus(403);
            }
            req.body.decodedAccount = account;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

function checkIfAccountAvailable(req, res, next) {
    databaseService.getAccount(req.body.decodedAccount)
        .then(dbAccount => {
            if (dbAccount && dbAccount.blocked === 0) {
                next();
            } else {
                res.sendStatus(401);
            }
        }
        ).catch(err => res.sendStatus(401));
}

//Checks if request updates itself or ADMIN updates USER
function checkIfUpdatesItself(req, res, next) {
    const account = req.body.decodedAccount;
    const updatedAccount = req.body.account;
    if (updatedAccount.email === account.email ||
        account.role === 'ADMIN' && updatedAccount.role === 'USER') {
        next();
    }
}

//Checks if request comes from ADMIN
function checkIfFromAdmin(req, res, next) {
    if (req.body.decodedAccount.role === 'ADMIN') {
        next();
    } else {
        res.sendStatus(401);
    }
}

module.exports = { checkIfFromAdmin, checkIfUpdatesItself, checkIfAccountAvailable, checkIfAuthenticated };