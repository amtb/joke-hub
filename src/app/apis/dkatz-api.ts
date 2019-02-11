import { IJoke } from '../models';

import { API } from './api';

interface IDKatzApiReply {
  id: number;
  type: string;
  setup: string;
  punchline: string;
}

export class DKatzApi extends API<IDKatzApiReply> {
  protected baseUrl = `https://official-joke-api.appspot.com/jokes`;

  protected getRequestUrl(): string {
    return `${this.baseUrl}/random`;
  }

  protected map(apiReply: IDKatzApiReply): IJoke {
    return {
      text: `${apiReply.setup}
        ${apiReply.punchline}`
    };
  }
}
