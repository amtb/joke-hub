import {App, JokeController, SlackNotifier} from './app';

const webhookUrl = 'https://hooks.slack.com/services/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';
// target = '30 8-17 * * 0-4'
const slackNotifier = new SlackNotifier(webhookUrl, '*/10 * * * * *');
slackNotifier.run();

const app = new App([
  // new JokeController()
]);

app.listen(6666);
