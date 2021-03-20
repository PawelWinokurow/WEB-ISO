const cryptoService = require('./crypto_service');
const databaseService = require('./database_service');
const emailService = require('./email_service');
const authService = require('./auth_service');
const validationService = require('./validation_service');

async function createAccount(req, res) {
    try {
        const requestAccount = req.body.account;
        const validatedAccount = await validationService.validateAccount(requestAccount);

        let accountToStore = {
            ...validatedAccount
        };
        let accountToSend = {
            ...validatedAccount
        };

        const firstPassword = cryptoService.generatePassword();
        accountToStore.password = cryptoService.hashPassword(firstPassword);
        accountToSend.password = firstPassword;

        if (databaseService.isAccountNotExists(validatedAccount)) {
            await databaseService.storeAccount(accountToStore);
            //emailService.sendNewAccount(accountToSend);
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
        const validatedAccount = await validationService.validateAccount(requestAccount);
        if (validatedAccount?.password) {
            const dbAccount = await databaseService.getAccount(validatedAccount);
            if (dbAccount && cryptoService.comparePasswords(validatedAccount.passwordOld, dbAccount.password)) {
                validatedAccount.password = cryptoService.hashPassword(validatedAccount.password);
                await databaseService.updateAccount(validatedAccount);
                res.json({
                    message: 'USRISUPD',
                    account: validatedAccount
                });
            } else {
                res.json({
                    error: `PSWDOLDNMATCH`
                })
            }
        } else {
            
            await databaseService.updateAccount(validatedAccount);
            
            res.json({
                message: 'USRISUPD',
                account: validatedAccount
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
        const validatedAccount = await validationService.validateAccount(requestAccount);
        await databaseService.deleteAccount(validatedAccount);
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

async function requestPasswordReset(req, res) {
    try {
        const email = req.body.account.email;
        const hash = cryptoService.generateHash();
        await databaseService.storePasswordReset(hash, email);
        emailService.sendPasswordResetLink(email, hash);
        res.json({
            message: 'PSWDWILLRES',
        });
    } catch (e) {
        console.error(e.stack);
        res.status(500).send({
            error: e
        });
    }
}

async function validatePasswordResetHash(req, res) {
    let isTrue = await databaseService.checkPasswordResetConfirmation(req.body.account.hash);
    if (isTrue) {
        res.status(200).json({isTrue});
    }
}

async function resetPassword(req, res) {
    try {
        const hash = req.body.account.hash;
        const password = req.body.account.password;
        const email = await databaseService.checkPasswordResetConfirmation(hash);
        let dbAccount = await databaseService.getAccount({ email: email });
        dbAccount.password = cryptoService.hashPassword(password);
        await databaseService.updateAccount(dbAccount);
        delete dbAccount.password;
        delete dbAccount.blocked;
        let JWT = authService.createJWT(dbAccount);
        JWT.message = 'PSWDISRES';
        //Send JWT back
        res.status(200).json(JWT);
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
        const validatedAccount = await validationService.validateAccount(requestAccount);
        await databaseService.updateAccount(validatedAccount);
        res.json({
            message: validatedAccount.blocked ? 'USRISBL' : 'USRISUN',
            account: validatedAccount
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
    validatePasswordResetHash,
    requestPasswordReset,
    blockAccount,
};