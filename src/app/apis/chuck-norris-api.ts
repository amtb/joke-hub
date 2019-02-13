import { IJoke } from '../models';
import { API } from './api';

interface IChuckNorrisApiReply {
  icon_url: string;
  id: string;
  ulr: string;
  value: string;
}

export class ChuckNorrisApi extends API<IChuckNorrisApiReply> {
  protected baseUrl = 'https://api.chucknorris.io/jokes';

  protected getRequestUrl(): string {
    return `${this.baseUrl}/random`;
  }

  protected map(apiReply: IChuckNorrisApiReply): IJoke {
    return {
      text: apiReply.value
    };
  }
}
