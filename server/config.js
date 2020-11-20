config = {}
config.web = {};
config.soap = {};
config.soap.auth = {};
config.mysql = {};
config.email = {};
config.email.auth = {};


config.soap.auth.username = "T_SI_MONPING";
config.soap.auth.password = "a09KIqg?9ofO";
//config.soap.auth.username = "T_SI_IWF_T";
//config.soap.auth.password = "N}+XyAE]A]>WcfnlR3D-gRyCHRbdyk5]+w\\f4hhm";

//storage duration for masks in the database in days
config.mysql.maskStorageDuration = 5;
config.mysql.host = "localhost";
config.mysql.user = "root";
config.mysql.password = "root";
config.mysql.database = "kea";

config.email.host = "smtp.mailtrap.io";
config.email.port = 2525;
config.email.auth.username = "f4f2f215cc54d0";
config.email.auth.password = "fb5bc5d739aae5";



config.web.port = process.env.WEB_PORT || 3000;
config.web.PROXY_URL = 'http://proxy.intranet.ri-solution.com:8080'


module.exports = config;

