import { Request, Response } from 'express';
import { AppAction } from '../../core/app-action';
import { userAuthRepository } from '../../repositories/user-auth.repository';

export class DisconnectUserAction extends AppAction {
  readonly method = 'delete';
  route = 'disconnect';
  validators = [];
  async process(request: Request, response: Response): Promise<void> {
    const { email } = await this.getUserAuth(request);

    if (!email) {
      response.sendStatus(401);
      return;
    }

    await userAuthRepository.deleteUserToken(email);

    response.json({ ok: true });
  }
}
