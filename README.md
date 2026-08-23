cat > README.md << 'EOF'
# Zair Bot

A Slack bot built with Slack Bolt (Node.js) that responds to custom slash commands. Runs 24/7 on Hack Club's Nest hosting via a systemd service, so it stays online even when my laptop is closed.

## Commands

- `/zair-ping` — check the bot's latency
- `/zair-help` — list all available commands
- `/zair-catfact` — get a random cat fact
- `/zair-joke` — get a random joke

## How it works

Built with `@slack/bolt` in Socket Mode, so it doesn't need a public HTTP endpoint or exposed port. The app listens for slash commands over a websocket connection to Slack and responds with `ack()` + `respond()`.

## Running locally

1. `npm install`
2. Create a `.env` file with `SLACK_BOT_TOKEN` and `SLACK_APP_TOKEN`
3. `node index.js`

## Deployment

Deployed on Hack Club Nest and kept alive 24/7 with a systemd service:

    systemctl --user start slackbot.service    # start
    systemctl --user stop slackbot.service     # stop
    systemctl --user restart slackbot.service  # restart

`Restart=always` in the service file means it auto-restarts if it ever crashes.

## AI usage declaration

Built with assistance from Claude (Anthropic) for scaffolding the Slack Bolt app, debugging deployment issues, and setting up the systemd service on Nest. I created the Slack app, wrote and tested all the slash commands myself, and handled the deployment.
EOF
git add README.md && git commit -m "add README" && git push
