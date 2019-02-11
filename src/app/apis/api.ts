import fetch, { RequestInit } from 'node-fetch';

import { IJoke } from '../models';

export abstract class API<ApiReply> {

  protected abstract baseUrl: string;

  public async getJoke(): Promise<IJoke> {
    try {
      const req = await fetch(this.getRequestUrl(), this.getRequestExtra());
      const data = await req.json() as ApiReply;
      return this.map(data);
    } catch (error) {
      console.error(error);
      throw new Error('Not so fun!');
    }
  }

  protected abstract getRequestUrl(): string;
  protected abstract map(apiReply: ApiReply): IJoke;

  protected getRequestExtra(): RequestInit {
    return {};
  }
}
