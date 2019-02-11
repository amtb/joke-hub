import {Headers, RequestInit} from 'node-fetch';

import { IJoke } from '../models';
import { API } from './api';

interface IDadJokeApiReply {
  id: string;
  joke: string;
  status: number;
}

export class DadJokeApi extends API<IDadJokeApiReply>  {
  protected baseUrl = 'https://icanhazdadjoke.com';

  protected getRequestUrl(): string {
    return `${this.baseUrl}/`;
  }

  protected getRequestExtra(): RequestInit {
    return {
      headers: new Headers({
        'Accept': 'application/json',
        'User-Agent': 'Joke hub (https://github.com/amtb/jokehub)',
      }),
    };
  }

  protected map(apiReply: IDadJokeApiReply): IJoke {
    return {
      text: `${apiReply.joke}`
    };
  }
}
