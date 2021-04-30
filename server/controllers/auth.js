const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const errorHandler = require('../middlewares/error');
const databaseService = require('../services/database');
const cryptoService = require('../services/crypto');
const PRIVATE_KEY = fs.readFileSync(path.join(process.cwd(), process.env.PRIVATE_KEY));
const ldap = require('ldapjs');
const clientLDAP = ldap.createClient({
    url: req.body.serverUrl
});


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

//$dn = "CN={$username},OU=D,OU=standarduser,OU=X-RIS,DC=root,DC=local";
async function login(req, res) {
    try {
        const requestAccount = req.body.account;

        // LDAP Connection Settings
        const server = "dns or ip here"; // 192.168.1.1
        const userPrincipalName = ""; // Username
        const password = "myPassword"; // User password
        const adSuffix = "dc=root,dc=local"; // test.com

        // Create client and bind to AD
        const client = ldap.createClient({
            url: `ldap://${server}`
        });

        client.bind(userPrincipalName, password, err => {
            assert.ifError(err);
        });

        // Search AD for user
        const searchOptions = {
            scope: "sub",
            filter: `(userPrincipalName=${userPrincipalName})`
        };

        client.search(adSuffix, searchOptions, (err, res) => {
            assert.ifError(err);

            res.on('searchEntry', entry => {
                console.log(entry.object.name);
            });
            res.on('searchReference', referral => {
                console.log('referral: ' + referral.uris.join());
            });
            res.on('error', err => {
                console.error('error: ' + err.message);
            });
            res.on('end', result => {
                console.log(result);
            });
        });

        // Wrap up
        client.unbind(err => {
            assert.ifError(err);
        });
    } catch (e) {
        errorHandler.unknownErrorResponse(e, 401);
    }
}
/*
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
*/

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