var express = require('express');
var schedule = require('node-schedule');
var db = require('./database')
var soap = require('./soap')
var email = require('./email')
var random = require('./random')
require('dotenv').config()

db.connect();

const app = express();

app.use(express.json());

/**
 * Runs each day at 00.00 and removes old not confirmed customer masks
 */
schedule.scheduleJob('0 0 * * *', function () {
  db.removeOldMasks();
});

/**
 * Enpoint to get customer masks from application.
 */
app.post("/request", function (req, res, next) {
  let mask = req.body;
  if (mask.isDirect) {
    soap.sendMask(mask.sapMask);
  } else {
    const hash = random.generateHash();
    db.storeMask(hash, mask.sapMask);
    email.sendEmail(hash, mask.emailTo);
  }
  res.json({ok:true});
});

/**
 * Enpoint to get email confirmations.
 */
app.get("/confirm", function (req, res, next) {
    db.checkConfirmation(req.query.hash).then(result => {
      var mask = JSON.parse(result.mask)
      soap.sendMask(mask);
      res.send('<p>Success! The mask was confirmed.</p>');
      next();
    })
    .catch(() => {
      res.send('<p>Error! The mask was not confirmed.</p>');
      next();
    })
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
    soap.test()
    console.log(`Example app listening at http://localhost:${process.env.WEB_PORT || 3000}`)
  })