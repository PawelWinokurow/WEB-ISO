var crypto = require('crypto');

/**
 * Generates the random hash depending on the current timestamp.
 */
exports.generateHash = function(){
    var current_date = (new Date()).valueOf().toString();
    var random = Math.random().toString();
    return crypto.createHash('sha256').update(current_date + random).digest('hex');
}