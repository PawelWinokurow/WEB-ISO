var express = require('express');
var schedule = require('node-schedule');
var db = require('./database')
var soap = require('./soap')
var email = require('./email')
var random = require('./random')
require('dotenv').config()


//BayWa Proxy
//process.env.http_proxy = config.web.PROXY_URL

db.connect();

const app = express();

app.use(express.json());
//app.use(morgan('dev'));

schedule.scheduleJob('0 0 * * *', function () {
  db.removeOldMasks();
});

app.post("/request", function (req, res, next) {
  //res.header('Access-Control-Allow-Origin', '*');
  //res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  //res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  let mask = req.body;

  if (mask.isDirect) {
    soap.sendMask(mask);
  } else {
    const hash = random.generateHash();
    db.storeMask(hash, mask);
    email.sendEmail(hash, mask.emailTo);
  }
  res.json({ok:true});
});

app.get("/confirm", function (req, res, next) {
  db.checkConfirmation(req.query.hash)
    .then(mask => {
      soap.sendMask(mask);
      soap.test()
      res.send('<p>Success! The mask was confirmed.</p>');
      next();
    })
    .catch(() => {
      res.send('<p>Error! The mask was not confirmed.</p>');
      next();
    })
});

app.get('/', (req, res) => {
  return res.send('Hello, world!');
});

/*https
  .createServer(
    {
      cert: fs.readFileSync('tls/public-cert.pem'),
      key: fs.readFileSync('tls/private-key.pem'),
    },
    app
  )
  .listen(8080);
*/
  app.listen(process.env.WEB_PORT || 3000, () => {
    //email.sendEmail("sdfsfsdf","paulweinmacher@gmail.com")
    console.log(`Example app listening at http://localhost:${process.env.WEB_PORT || 3000}`)
  })