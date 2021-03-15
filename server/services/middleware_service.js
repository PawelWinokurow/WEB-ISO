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

function checkIfUserAvailable(req, res, next) {
    databaseService.getUser(req.body.decodedUser)
        .then(dbUser => {
            if (dbUser.blocked === 0) {
                next();
            } else {
                res.sendStatus(401);
            }
        }
        ).catch(err => res.sendStatus(401));
}

//Checks if request updates itself or ADMIN updates USER
function checkIfUpdatesItself(req, res, next) {
    const user = req.body.decodedUser;
    const updatedUser = req.body.user;
    if (updatedUser.email === user.email ||
        user.role === 'ADMIN' && updatedUser.role === 'USER') {
        next();
    }
}

//Checks if request comes from ADMIN
function checkIfFromAdmin(req, res, next) {
    if (req.body.decodedUser.role === 'ADMIN') {
        next();
    } else {
        res.sendStatus(401);
    }
}

module.exports = { checkIfFromAdmin, checkIfUpdatesItself, checkIfUserAvailable, checkIfAuthenticated };