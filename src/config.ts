export interface IConfig {
  port: number;
  slack: {
    cronTime: string;
    webhook: string;
  };
}

export const config: IConfig = {
  port: Number(process.env.PORT) || 6666,
  slack: {
    cronTime: process.env.SLACK_CRON_TIME || '*/30 * * * * *',
    webhook: getWebhookUrl()
  }
};

function getWebhookUrl(): string {
  const defaultUrl = 'https://hooks.slack.com/services/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';
  return process.env.SLACK_WEBHOOK_URL || defaultUrl;
}
