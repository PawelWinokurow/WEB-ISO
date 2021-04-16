const databaseService = require('../services/database');


//Checks if requester exists and is not blocked
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
function checkIfUpdatesItselfOrAdmin(req, res, next) {
    const account = req.body.decodedAccount;
    const updatedAccount = req.body.account;
    if (updatedAccount.email === account.email ||
        account.role === 'ADMIN' && updatedAccount.role === 'USER') {
        next();
    }
}

//Checks if email parameter in GET is the same as email of the requester 
function checkEmail(req, res, next) {
    const account = req.body.decodedAccount;
    const email = req.query.email;
    if (email === account.email) {
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

module.exports = { 
    checkIfFromAdmin, 
    checkIfUpdatesItselfOrAdmin, 
    checkIfAccountAvailable, 
    checkEmail };