const cryptoService = require('./crypto_service');
const databaseService = require('./database_service');
const emailService = require('./email_service');
const jwt = require('jsonwebtoken');

async function createAccount(req, res) {
    try {
        const requestAccount = req.body.account;
        let accountToStore = {
            ...requestAccount
        };
        let accountToSend = {
            ...requestAccount
        };

        const firstPassword = cryptoService.generatePassword();
        accountToStore.password = cryptoService.hashPassword(firstPassword);
        accountToSend.password = firstPassword;

        if (databaseService.isAccountNotExists(requestAccount)) {
            await databaseService.storeAccount(accountToStore);
            // emailService.sendNewAccount(accountToSend);
            res.json({
                message: 'USRISCR'
            });
        } else {
            res.json({
                error: 'IDUSED'
            });
        }
    } catch (e) {
        console.error(e.stack);
        res.status(500).send({
            error: e
        });
    }
}

async function updateAccount(req, res) {
    try {
        const requestAccount = req.body.account;
        if (requestAccount?.password) {
            const dbAccount = await databaseService.getAccount(requestAccount);
            if (dbAccount && cryptoService.comparePasswords(requestAccount.passwordOld, dbAccount.password)) {
                requestAccount.password = cryptoService.hashPassword(requestAccount.password);
                await databaseService.updateAccount(requestAccount);
                res.json({
                    message: 'USRISUPD',
                    account: requestAccount
                });
            } else {
                res.json({
                    error: `PSWDOLDNMATCH`
                })
            }
        } else {
            await databaseService.updateAccount(requestAccount);
            res.json({
                message: 'USRISUPD',
                account: requestAccount
            });
        }
    } catch (e) {
        console.error(e.stack);
        res.status(500).send({
            error: e
        });
    }
}

async function deleteAccount(req, res) {
    try {
        const requestAccount = req.body.account;
        await databaseService.deleteAccount(requestAccount);
        res.json({
            message: 'USRISDEL'
        })
    } catch (e) {
        console.error(e.stack);
        res.status(500).send({
            error: e
        });
    }
}

async function getAccounts(req, res) {
    try {
        const accounts = await databaseService.getAccounts();
        res.json(accounts)
    } catch (e) {
        console.error(e.stack);
        res.status(500).send({
            error: e
        });
    }
}

async function resetPassword(req, res) {
    try {
        const email = req.body.account.email;
        const hash = cryptoService.generateHash();
        await databaseService.storePasswordReset(hash, email);
        emailService.sendAccountResetConfirmation(emailTo, hash);
        res.json({
            message: 'PSWDISRES',
        });
    } catch (e) {
        console.error(e.stack);
        res.status(500).send({
            error: e
        });
    }
}

async function confirmPasswordReset(req, res) {
    let isInDB = await databaseService.checkPasswordResetConfirmation(req.query.hash);
    if (isInDB){
        res.status(200).json({
            isTrue: isInDB
        });
    }

}


async function resetPassword(req, res) {
    try {
        const hash = req.body.hash
        const password = req.body.password
        const email = await databaseService.checkPasswordResetConfirmation(hash);
        let dbAccount = await databaseService.getAccount({ email: email });
        dbAccount.password = cryptoService.hashPassword(password);
        await databaseService.updateAccount(dbAccount);
        delete dbAccount.password;
        delete dbAccount.blocked;
        const jwtBearerToken = jwt.sign(dbAccount, PRIVATE_KEY, {
            algorithm: 'RS256',
            expiresIn: process.env.JWT_DURATION,
        });
        //Send JWT back
        res.status(200).json({
            message: 'PSWDISRES',
            idToken: jwtBearerToken,
            expiresIn: process.env.JWT_DURATION,
            account: dbAccount
        });

    } catch (e) {
        console.error(e.stack);
        res.status(500).send({
            error: e
        });
    }
}

async function blockAccount(req, res) {
    try {
        const requestAccount = req.body.account;
        await databaseService.updateAccount(requestAccount);
        res.json({
            message: requestAccount.blocked ? 'USRISBL' : 'USRISUN',
            account: requestAccount
        })
    } catch (e) {
        console.error(e.stack);
        res.status(500).send({
            error: e
        });
    }
}

module.exports = {
    createAccount,
    updateAccount,
    deleteAccount,
    resetPassword,
    getAccounts,
    confirmPasswordReset,
    blockAccount,
};