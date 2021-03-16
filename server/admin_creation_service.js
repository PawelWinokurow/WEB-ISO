const databaseService = require('./services/database_service');
const cryptoService = require('./services/crypto_service');

require('dotenv').config();

admin = {
    username: 'admin',
    email: 'admin@admin.de',
    companyCode: '1001',
    password: cryptoService.hashPassword('admin'),
    blocked: false,
    role: 'ADMIN',
};

function storeAdmin(accountToStore){
    databaseService.connect();
    setTimeout(async function() {
        await databaseService.storeAccount(accountToStore)
    }, 2000);
}

storeAdmin(admin);
