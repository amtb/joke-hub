import { Request, Response } from 'express';

import { API, ChuckNorrisApi, DadJokeApi, DKatzApi, INCDBApi} from '../../apis';
import { Controller } from '../controller';

export class JokeController extends Controller {

  protected basePath = '/joke';

  private apis: { [key: string]: API<any> } = {
    'chuck-norris': new ChuckNorrisApi(),
    'dad': new DadJokeApi(),
    'dkatz': new DKatzApi(),
    'incdb': new INCDBApi()
  };

  public initRoutes(): void {
    this.router.get('/random', this.getRandomJoke);
    this.router.get('/:type', this.getJokeOfType);
  }

  private getRandomJoke = async (request: Request, response: Response) => {
    const apis = Object.values(this.apis);
    const api = apis[this.getRandomInt(apis.length)];
    this.sendJoke(api, response);
  }

  private getJokeOfType = async (request: Request, response: Response) => {
    const type = request.params.type;
    const api = this.apis[type];
    this.sendJoke(api, response);
  }

  private async sendJoke(api: API<any>, response: Response) {
    try {
      const joke = await api.getJoke();
      response.send(joke);
    } catch (error) {
      response.status(404).send('Something wrong happened!');
    }
  }

  private getRandomInt(max: number, min: number = 0): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
