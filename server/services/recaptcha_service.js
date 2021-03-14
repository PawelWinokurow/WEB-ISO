
var PROXY_AGENT = null

function setProxyAgent(agent) {
    PROXY_AGENT = agent;
}

function validateRecaptcha(req, res) {
    let token = req.body.recaptcha;

    if (token === null || token === undefined) {
        res.status(201).send({
            success: false,
            message: "Token is empty or invalid"
        })
        return console.log("token empty");
    }
    const options = {
        method: "post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        },
        body: `secret=${process.env.RECAPTCHA_KEY}&response=${token}&remoteip=${req.socket.remoteAddress}`
    }
    if (PROXY_AGENT) {
        options.agent = PROXY_AGENT;
    }
    fetch(process.env.RECAPTCHA_HOST, options)
        .then(res => res.json()).catch(err => {
            res.send({
                success: false
            });
            return console.log(`Error: ${err}`);
        })
        .then(json => {
            if (json.success !== undefined && !json.success) {
                res.send({
                    success: false
                });
            }
            //if passed response success message to client.
            res.send({
                success: true
            });
        })
}

module.exports = { validateRecaptcha, setProxyAgent };