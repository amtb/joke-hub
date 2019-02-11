import * as bodyParser from 'body-parser';
import express from 'express';

import { Controller } from './controllers';

export class App {

  private expressApp: express.Application;

  constructor(controllers: Controller[]) {
    this.expressApp = express();

    this.initMiddlewares();
    this.initControllers(controllers);
  }

  public listen(port: number = 80) {
    this.expressApp.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  }

  private initControllers(controllers: Controller[]): void {
    controllers.forEach((controller) => {
      controller.mount(this.expressApp);
    });
  }

  private initMiddlewares(): void {
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(this.loggerMiddleware);
  }

  private loggerMiddleware(request: express.Request, response: express.Response, next) {
    console.log(`${request.method} ${request.path}`);
    next();
  }
}
