const cryptoService = require('./crypto_service');
const databaseService = require('./database_service');


function createUser(req, res) {
    let user = req.body.user;
    let userToStore = {
        ...user
    };
    userToStore.password = cryptoService.hashPassword(user.password);
    databaseService.isUserNotExists(user)
        .then(() => databaseService.storeUser(userToStore))
        .then(() => authService.login(req, res))
        .catch(() => res.json({
            message: 'Duplicate'
        }));
}

async function updateUser(req, res) {
    console.log("update")
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
                    message: `not match`
                })
            }
        } else {
            await databaseService.updateUser(requestUser);
            res.json(requestUser);
        }
    } catch (e) {
        res.status(500).send("Database error: " + err);
    }
}

function deleteUser(req, res) {
    databaseService.deleteUser(req.body.user)
        .then(() => res.json({
            ok: true
        }))
        .catch(err => res.json({
            message: err
        }));
}

function getUsers(req, res) {
    databaseService.getUsers()
        .then(users => res.json(users))
        .catch(err => res.json({
            message: err
        }));
}

function blockOrResetUser(req, res) {
    const user = req.body.user;
    if (user?.operation === 'block') {
        blockUser(req, res);
    } else if (user?.operation === 'reset') {
        resetPassword(req, res);
    }
}

function resetPassword(req, res) {
    let user = req.body.user;
    let oldUser = {
        ...user
    }
    const newPassword = cryptoService.generateHash().slice(0, 20);
    user.password = cryptoService.hashPassword(newPassword);

    databaseService.updateUser(user)
        .then(() => res.json(user))
        .catch(err => res.status(500).send(`Database error: ${err}`))
        .then(() => {
            const message = {
                from: "WEB-ISO",
                to: user.email,
                subject: 'New password WEB-ISO',
                html: `<p>Your WEB-ISO password was reset. New WEB-ISO password: ${newPassword}</p>`
            };
            emailService.sendEmail(message);
        })
        .catch(err => {
            databaseService.updateUser(oldUser).then();
            res.status(500).send(`Email send error: ${err}`);
        });
}

function blockUser(req, res) {
    databaseService.updateUser(req.body.user)
        .then(() => res.json(req.body.user))
        .catch(err => res.json({
            message: err
        }))
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUsers,
    blockOrResetUser
};