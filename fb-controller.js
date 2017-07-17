const DEBUG = process.env.DEBUG,
    watson = require('./watson-cfg').config,
    Botkit = require('botkit'),
    controller = Botkit.facebookbot({
        debug: DEBUG,
        access_token: process.env.ACCESS_TOKEN,
        verify_token: process.env.VERIFY_TOKEN,
        require_delivery: true
    });

controller.middleware.receive.use(watson.receive);

if (DEBUG) {
    controller.on('tick', (bot, event) => {
        if (event) console.log(event);
    });
}

controller.on('facebook_optin', (bot, message) => {
    bot.reply(message, 'Welcome to my app!');
});

module.exports = controller;