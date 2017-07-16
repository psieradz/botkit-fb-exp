require('dotenv').load();

const controller = require("./controller");
const bot = controller.spawn();

controller.setupWebserver(process.env.port || 5000, (err, webserver) => {
    controller.createWebhookEndpoints(controller.webserver, bot, () => {
        console.log('Bot successfully deployed');
    });
});

controller.hears(['.*'], ['message_received'], (bot, message) => {
    if (message.watsonError) {
        bot.reply(message, "I'm sorry, but for technical reasons I can't respond to your message");
    } else {
        bot.reply(message, message.watsonData.output.text.join('\n'));
    }
});
