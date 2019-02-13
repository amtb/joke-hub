import { IJoke } from '../models';
import { API } from './api';

interface IINCDBApiReply {
  type: string;
  value: {
    id: number;
    joke: string;
  };
}

export class INCDBApi extends API<IINCDBApiReply> {
  protected baseUrl = 'https://api.icndb.com/jokes';

  protected getRequestUrl(): string {
    return `${this.baseUrl}/random`;
  }

  protected map(apiReply: IINCDBApiReply): IJoke {
    return {
      text: apiReply.value.joke
    };
  }
}
