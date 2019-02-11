import { IJoke } from '../models';
import { API } from './api';

interface IChuckNorrisApiReply {
  type: string;
  value: {
    id: number;
    joke: string;
  };
}

export class ChuckNorrisApi extends API<IChuckNorrisApiReply> {
  protected baseUrl = 'https://api.icndb.com/jokes';

  protected getRequestUrl(): string {
    return `${this.baseUrl}/random`;
  }

  protected map(apiReply: IChuckNorrisApiReply): IJoke {
    return {
      text: apiReply.value.joke
    };
  }
}
