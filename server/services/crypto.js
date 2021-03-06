const crypto = require('crypto');
const bcrypt = require('bcrypt');
const paswdgen = require('generate-password');

/**
 * Generates random password.
 */
 function generatePassword() {
    let password = paswdgen.generate({
        length: 20,
        numbers: true,
        symbols: true
    });
    return password;
}

/**
 * Generates the random hash depending on the current timestamp.
 */
function generateHash() {
    let current_date = (new Date()).valueOf().toString();
    let random = Math.random().toString();
    return crypto.createHash('sha256').update(current_date + random).digest('hex');
}

/**
 * Hashes password.
 * @param {string} password plain text password
 * @param {string} salt
 * @returns {string} hashed password
 */
function hashPassword(password) {
    const saltRounds = 10;
    return bcrypt.hashSync(password, saltRounds);
}

/**
 * Compares passwords.
 * @param {string} plaintextPassword
 * @param {string} hashPassword
 * @returns {boolean} true if the same
 */
function comparePasswords(plaintextPassword, hashPassword) {
    return bcrypt.compareSync(plaintextPassword, hashPassword);
}

module.exports = { comparePasswords, hashPassword, generateHash, generatePassword };