import { Request, Response } from 'express';

import { API, ChuckNorrisApi, DadJokeApi, DKatzApi} from '../../apis';
import { Controller } from '../controller';

export class JokeController extends Controller {

  protected basePath = '/joke';

  private apis: { [key: string]: API<any> } = {
    'chuck-norris': new ChuckNorrisApi(),
    'dad': new DadJokeApi(),
    'dkatz': new DKatzApi()
  };

  public initRoutes(): void {
    this.router.get('/:type', this.getJokeOfType);
  }

  public getJokeOfType = async (request: Request, response: Response) => {
    const type = request.params.type;
    const api = this.apis[type];

    try {
      const joke = await api.getJoke();
      response.send(joke);
    } catch (error) {
      response.status(404).send('Something wrong happened!');
    }
  }
}
