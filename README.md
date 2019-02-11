# Joke hub
Aggregates jokes from

- icanhazdadjoke https://icanhazdadjoke.com/
- icndb: http://www.icndb.com/api/
- David Katz jokes https://github.com/15Dkatz/official_joke_api

and serves as a hub.

## Slack notifier
Sends a random joke according to the cron config (see `config.ts`)
For more about cron time see https://crontab.guru/

## Getting started
`yarn run watch`

Target one of the following 
- localhost:6666/joke/dad
- localhost:6666/joke/dkatz
- localhost:6666/joke/chuck-norris

