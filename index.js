require("dotenv").config();

const { App } = require("@slack/bolt");
const axios = require("axios");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.use(async ({ command, next }) => {
  if (command) {
    console.log(`[${new Date().toISOString()}] ${command.command} used by ${command.user_name}`);
  }
  await next();
});

app.command("/zair-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

app.command("/zair-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:
`Available Commands:
/zair-ping - Check bot latency
/zair-catfact - Get a cat fact
/zair-joke - Get a random joke
/zair-8ball - Ask the magic 8-ball a question`
  });
});

app.command("/zair-catfact", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://catfact.ninja/fact");
    await respond({ text: `Cat Fact:\n${response.data.fact}` });
  } catch (err) {
    await respond({ text: "Failed to fetch a cat fact." });
  }
});

app.command("/zair-joke", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
    await respond({
      text:
`${response.data.setup}

${response.data.punchline}`
    });
  } catch (err) {
    await respond({ text: "Failed to fetch a joke." });
  }
});

app.command("/zair-8ball", async ({ command, ack, respond }) => {
  await ack();
  const answers = [
    "It is certain.", "Without a doubt.", "Yes, definitely.",
    "Ask again later.", "Cannot predict now.", "Don't count on it.",
    "My reply is no.", "Very doubtful.", "Signs point to yes."
  ];
  if (!command.text) {
    await respond({ text: "Ask me something! Usage: `/zair-8ball will I ship this project?`" });
    return;
  }
  const answer = answers[Math.floor(Math.random() * answers.length)];
  await respond({ text: `🎱 *${command.text}*\n${answer}` });
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();
