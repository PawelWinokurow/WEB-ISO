const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const databaseService = require('./database_service');

const PUBLIC_KEY = fs.readFileSync(path.join(__dirname, '..', process.env.PUBLIC_KEY));


exports.checkIfAuthenticated = function (req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const jwtBearerToken = authHeader.split(' ')[1];
        jwt.verify(jwtBearerToken, PUBLIC_KEY, {
            algorithm: ['RS256']
        }, (err, user) => {
            if (err) {
                console.log(err);
                return res.sendStatus(403);
            }
            req.body.decodedUser = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

exports.checkIfUserAvailable = function (req, res, next) {
    databaseService.getUser(req.body.decodedUser)
    .then(result => {return {...result[0]}})
    .then(db_user => {
        if (db_user.blocked === 0) {
            next();
        } else {
            res.sendStatus(401);
        }
    }
    ).catch(err => res.sendStatus(401));
}

//Checks if request updates itself or ADMIN updates USER
exports.checkIfUpdatesItself = function (req, res, next) {
    const user = req.body.decodedUser;
    const updated_user = req.body.user;
    if (updated_user.email === user.email ||
        user.role === 'ADMIN' && updated_user.role === 'USER') {
        next();
    }
}

//Checks if request comes from ADMIN
exports.checkIfFromAdmin = function (req, res, next) {
    if (req.body.decodedUser.role === 'ADMIN') {
        next();
    } else {
        res.sendStatus(401);
    }
}