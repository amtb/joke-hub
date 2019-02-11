import {Application, Router} from 'express';

export abstract class Controller {
  protected abstract basePath: string;
  protected router = Router();

  public mount(app: Application) {
    this.initRoutes();
    app.use(this.basePath, this.router);
  }

  public abstract initRoutes(): void;
}
