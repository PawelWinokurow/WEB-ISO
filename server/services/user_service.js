const cryptoService = require('./crypto_service');
const databaseService = require('./database_service');
const emailService = require('./email_service');


async function createUser(req, res) {
    try {
        const requestUser = req.body.user;
        let userToStore = {
            ...requestUser
        };
        let userToSend = {
            ...requestUser
        };

        const firstPassword = cryptoService.generatePassword();
        
        userToStore.password = cryptoService.hashPassword(firstPassword);
        userToSend.password = firstPassword;
        
        let isUserNotExists = await databaseService.isUserNotExists(requestUser);
        if (isUserNotExists) {
            await databaseService.storeUser(userToStore);
            emailService.sendNewUser(userToSend);
            res.json({
                message: 'USRISCR'
            });
        } else {
            res.json({
                error: 'IDUSED'
            });
        }
    } catch (e) {
        res.status(500).send({
            error: e
        });
    }
}

async function updateUser(req, res) {
    try {
        const requestUser = req.body.user;
        console.log('in')
        if (requestUser.password) {
            const dbUser = await databaseService.getUser(requestUser);
            if (cryptoService.comparePasswords(requestUser.passwordOld, dbUser.password)) {
                requestUser.password = cryptoService.hashPassword(requestUser.password);
                await databaseService.updateUser(requestUser);
                res.json({
                    message: 'USRISUPD',
                    user: requestUser
                });
            } else {
                res.json({
                    error: `PSWDOLDNMATCH`
                })
            }
        } else {
            await databaseService.updateUser(requestUser);
                res.json({
                    message: 'USRISUPD',
                    user: requestUser
                });
        }
    } catch (e) {
        res.status(500).send({
            error: e
        });
    }
}

async function deleteUser(req, res) {
    try {
        const requestUser = req.body.user;
        await databaseService.deleteUser(requestUser);
        res.json({
            message: 'USRISDEL'
        })
    } catch (e) {
        res.status(500).send({
            error: e
        });
    }
}

async function getUsers(req, res) {
    try {
        const users = await databaseService.getUsers();
        res.json(users)
    } catch (e) {
        res.status(500).send({
            error: e
        });
    }
}

function blockOrResetUser(req, res) {
    const requestUser = req.body.user;
    if (requestUser?.operation === 'block') {
        blockUser(req, res);
    } else if (requestUser?.operation === 'reset') {
        resetPassword(req, res);
    }
}

async function resetPassword(req, res) {
    try {
        const requestUser = req.body.user;
        let oldUser = {
            ...requestUser
        }
        const newPassword = cryptoService.generatePassword();
        requestUser.password = cryptoService.hashPassword(newPassword);

        await databaseService.updateUser(requestUser);
        emailService.resetPassword(requestUser.email, newPassword);

        res.json({
            message: 'PSWDISRES',
        })

    } catch (e) {
        res.status(500).send({
            error: e
        });
    }
}

async function blockUser(req, res) {
    try {
        const requestUser = req.body.user;
        await databaseService.updateUser(requestUser);
        res.json({
            message: requestUser.blocked ? 'USRISBL': 'USRISUN',
            user: requestUser
        })
    } catch (e) {
        res.status(500).send({
            error: e
        });
    }
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUsers,
    blockOrResetUser
};