const cryptoService = require('./crypto_service');
const databaseService = require('./database_service');


async function createUser(req, res) {
    try {
        const requestUser = req.body.user;
        let userToStore = {
            ...requestUser
        };
        userToStore.password = cryptoService.hashPassword(requestUser.password);

        let isUserNotExists = await databaseService.isUserNotExists(requestUser);

        if (isUserNotExists) {
            await databaseService.storeUser(userToStore);
            await authService.login(req, res);
        } else {
            res.json({
                message: 'Duplicate'
            });
        }
    } catch (e) {
        res.status(500).send({
            message: e
        });
    }
}

async function updateUser(req, res) {
    try {
        const requestUser = req.body.user;
        if (requestUser.password) {
            const dbUser = await databaseService.getUser(requestUser);
            if (cryptoService.comparePasswords(requestUser.passwordOld, dbUser.password)) {
                requestUser.password = cryptoService.hashPassword(requestUser.password);
                await databaseService.updateUser(requestUser);
                res.json(requestUser);
            } else {
                res.json({
                    message: `Not match`
                })
            }
        } else {
            await databaseService.updateUser(requestUser);
            res.json(requestUser);
        }
    } catch (e) {
        res.status(500).send({
            message: e
        });
    }
}

async function deleteUser(req, res) {
    try {
        const requestUser = req.body.user;
        await databaseService.deleteUser(requestUser);
        res.json({
            ok: true
        });
    } catch (e) {
        res.status(500).send({
            message: e
        })
    }
}

async function getUsers(req, res) {
    try {
        const users = await databaseService.getUsers();
        res.json(users)
    } catch (e) {
        res.status(500).send({
            message: e
        })

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
        const newPassword = cryptoService.generateHash().slice(0, 20);
        requestUser.password = cryptoService.hashPassword(newPassword);

        await databaseService.updateUser(requestUser);

        const message = {
            from: "WEB-ISO",
            to: requestUser.email,
            subject: 'New password WEB-ISO',
            html: `<p>Your WEB-ISO password was reset. New WEB-ISO password: ${newPassword}</p>`
        };
        emailService.sendEmail(message);
        res.json(requestUser)

    } catch (e) {
        res.status(500).send({
            message: e
        });
    }

}

async function blockUser(req, res) {
    try {
        const requestUser = req.body.user;
        await databaseService.updateUser(requestUser);
        res.json(requestUser)
    } catch (e) {
        res.status(500).send({
            message: e
        })
    }
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUsers,
    blockOrResetUser
};