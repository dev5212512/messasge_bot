const welcomeChannelId='random2'
require("dotenv").config();
const { App } = require('@slack/bolt');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true, // add this
  appToken: process.env.SLACK_APP_TOKEN, // add this
  logLevel: 'debug',
  scopes: ['channels:history', 'chat:write', 'commands']
});


// Not working
app.message('hello', async ({ message, say }) => {
  console.log('=-----------------------------in---------------------')
  // say() sends a message to the channel where the event was triggered
  await say(`Hey there <@${message.user}>!`);
});


app.event('channel_rename', async({event, client, logger}) => {
  await client.chat.postMessage({
    channel: welcomeChannelId,
    text: JSON.stringify(event)
  })
})


app.command('/socketslash', async ({ command, ack, say }) => {
  // Acknowledge command request
  await ack();

  await say(`${command.text}`);
});

(async () => {
  // Start the app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
