import { Request, Response, IRouter } from 'express';
import { AppAction } from './app-action';
import { validationResult } from 'express-validator';

export abstract class AppController {
  abstract path: string;
  abstract actions: (new () => AppAction)[];

  register(app: IRouter) {
    this.actions.forEach((ActionConstructor) => {
      const action = new ActionConstructor();

      app[action.method](
        `${this.path}/${action.route}`,
        ...action.validators,
        this.createActionHandler(action)
      );

      console.log(
        `Registered route: ${action.method.toUpperCase()} ${this.path}/${
          action.route
        }`
      );
    });
  }

  createActionHandler(action: AppAction) {
    return async (req: Request, res: Response) => {
      console.log(`${action.route}`);

      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }

      await action.process(req, res);
    };
  }
}
