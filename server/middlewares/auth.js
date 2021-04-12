const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const PUBLIC_KEY = fs.readFileSync(path.join(process.cwd(), process.env.PUBLIC_KEY));

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

module.exports = {
    checkIfAuthenticated,
};