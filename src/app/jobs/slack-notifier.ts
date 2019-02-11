import {CronJob} from 'cron';
import fetch from 'node-fetch';

import { API, ChuckNorrisApi, DadJokeApi, DKatzApi } from '../apis';

export class SlackNotifier {
  private webhookUrl: string;
  private iteration = 0;
  private cronJob: CronJob;

  private apis: Array<API<any>> = [
    new DKatzApi(),
    new ChuckNorrisApi(),
    new DadJokeApi()
  ];

  constructor(webhookUrl: string, cronTimeCfg: string) {
    this.webhookUrl = webhookUrl;
    this.init(cronTimeCfg);
  }

  public run() {
    console.log(`Slack notifier: Running - time is : ${new Date()}`);
    this.cronJob.start();
  }

  private init(cronTimeCfg: string) {
    this.cronJob = new CronJob(cronTimeCfg, this.onTick);
  }

  private onTick = async () => {
    const nextApi = this.apis[this.iteration++ % this.apis.length];
    console.log(`Slack notifier: current ${this.cronJob.lastDate()} - next ${this.cronJob.nextDates(1)}`);
    try {
      const joke = await nextApi.getJoke();
      // console.log(joke);
      this.postMessage(joke.text);
    } catch (error) {
      console.error('Something wrong happened!');
    }
  }

  private async postMessage(message: string) {
    await fetch(this.webhookUrl, {
      body: JSON.stringify({
        text: message
      }),
      headers: {
        'Content-type': 'application/json'
      },
      method: 'post'
    });
  }
}
