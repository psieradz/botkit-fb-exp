const watsonMiddleware = require('botkit-middleware-watson')({
  username: process.env.CONVERSATION_USERNAME,
  password: process.env.CONVERSATION_PASSWORD,
  workspace_id: process.env.WORKSPACE_ID,
  version_date: '2017-05-26',
  minimum_confidence: 0.50
});

module.exports.config = watsonMiddleware;