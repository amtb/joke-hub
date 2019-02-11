import {App, JokeController, SlackNotifier} from './app';
import {config} from './config';

// target = '30 8-17 * * 0-4'
const slackNotifier = new SlackNotifier(config.slack.webhook, config.slack.cronTime);
slackNotifier.run();

const app = new App([
  new JokeController()
]);

app.listen(config.port);
