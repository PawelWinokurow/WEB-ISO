const databaseService = require('./services/database');
const cryptoService = require('./services/crypto');

require('dotenv').config();

admin = {
    username: 'admin',
    email: 'admin@admin.de',
    companyCode: '1001',
    password: cryptoService.hashPassword('admin'),
    blocked: false,
    role: 'ADMIN',
};

async function storeAdmin(accountToStore){
    await databaseService.connect()
    await databaseService.dropTables();
    await databaseService.createTables();
    await databaseService.storeAccount(accountToStore)
    console.log('Administrator was created');
}

storeAdmin(admin);
