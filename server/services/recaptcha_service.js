const fetch = require('node-fetch');

let PROXY_AGENT = null

function setProxyAgent(agent) {
    PROXY_AGENT = agent;
}

async function validateRecaptcha(req, res) {
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

    try {
        let response = await fetch(process.env.RECAPTCHA_HOST, options);
        let json = await response.json();
        if (json.success !== undefined && !json.success) {
            res.send({
                success: false
            });
        } else {
            //if passed response success message to client.
            res.send({
                success: true
            });
        }
    } catch (e) {
        console.error(e.stack);
        res.send({
            success: false
        });
    }
}

module.exports = {
    validateRecaptcha,
    setProxyAgent
};