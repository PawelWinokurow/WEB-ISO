config = {}
config.web = {};
config.mysql = {};
config.email = {};
config.email.auth = {};


//storage time for masks in the database
config.mysql.maskStorageTime = 5;
config.mysql.host = "localhost";
config.mysql.user = "root";
config.mysql.password = "root";
config.mysql.database = "kea";

config.email.host = "smtp.mailtrap.io";
config.email.port = 2525;
config.email.auth.user = "f4f2f215cc54d0";
config.email.auth.password = "fb5bc5d739aae5";



config.web.port = process.env.WEB_PORT || 3000;


module.exports = config;

