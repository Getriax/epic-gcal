import { Request, Response } from 'express';
import { AppAction } from '../../core/app-action';
import { googleOAuth2Service } from '../../services/google-oauth-service';
import { query } from 'express-validator';
import { userAuthRepository } from '../../repositories/user-auth.repository';

export class GetGoogleAuthTokenAction extends AppAction {
  readonly method = 'get';
  route = 'google/token';
  validators = [query('code').isString()];
  async process(request: Request, response: Response): Promise<void> {
    try {
      const auth = await googleOAuth2Service.getTokens(
        request.query.code as string
      );

      if (!auth?.tokens?.id_token) {
        response.sendStatus(500);
        return;
      }

      const { tokens, email } = auth;

      await userAuthRepository.saveUserToken(email, tokens);

      response.json({ token: tokens.id_token });
    } catch (error) {
      console.error(error);
      response.sendStatus(500);
    }
  }
}
