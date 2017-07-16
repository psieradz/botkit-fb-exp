require('dotenv').load();

const DEBUG = process.env.DEBUG,
    Botkit = require('botkit'), 
    controller = Botkit.facebookbot({
        debug: DEBUG,
        access_token: process.env.ACCESS_TOKEN,
        verify_token: process.env.VERIFY_TOKEN,
        require_delivery: true,
        validate_requests: false
    })

const bot = controller.spawn({});

if (DEBUG) {
    controller.on('tick', (bot, event) => { 
        if (event) console.log(event);
    });
}
// if you are already using Express, you can use your own server instance...
// see "Use BotKit with an Express web server"
controller.setupWebserver(process.env.port || 5000, (err, webserver) => {
  controller.createWebhookEndpoints(controller.webserver, bot, () => {
      console.log('This bot is online!!!');
  });
});

controller.on('facebook_optin', (bot, message) => {
    bot.reply(message, 'Welcome to my app!');
});

controller.hears(['hello'], 'message_received', (bot, message) => {
    bot.reply(message, 'Hey there.');
});

controller.hears(['cookies'], 'message_received', (bot, message) => {
    bot.startConversation(message, (err, convo) => {
        convo.say('Did someone say cookies!?!!');
        convo.ask('What is your favorite type of cookie?', (response, convo) => {
            convo.say('Golly, I love ' + response.text + ' too!!!');
            convo.next();
        });
    });
});