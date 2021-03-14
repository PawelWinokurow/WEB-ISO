const cryptoService = require('./crypto_service');
const databaseService = require('./database_service');


function createUser(req, res) {
    var user = req.body.user;
    var userToStore = { ...user };
    userToStore.password = cryptoService.hashPassword(user.password);
    databaseService.isUserNotExists(user)
        .then(() => databaseService.storeUser(userToStore))
        .then(() => authService.login(req, res))
        .catch(() => res.json({
            message: 'Duplicate'
        }));
}

function updateUser(req, res) {
    var user = req.body.user;
    if (user.password) {
        databaseService.getUser(user)
            .then(dbUser => new Promise((resolve, reject) => {
                if (cryptoService.comparePasswords(user.passwordOld, dbUser.password)) {
                    user.password = cryptoService.hashPassword(user.password);
                    resolve(user);
                }
                reject(false);
            }))
            .catch(err => {
                res.json({
                    message: `Old password doesn't match.`
                })
            })
            .then(user => databaseService.updateUser(user))
            .then(() => res.json(user))
            .catch(err => res.status(500).send(`Database error: ${err}`))
    } else {
        databaseService.updateUser(user)
            .then(() => res.json(user))
            .catch(err => res.status(500).send(`Database error: ${err}`))
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
    var user = req.body.user;
    var oldUser = { ...user }
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

module.exports = { createUser, updateUser, deleteUser, getUsers, blockOrResetUser };