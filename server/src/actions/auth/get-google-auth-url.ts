import { Request, Response } from 'express';
import { AppAction } from '../../core/app-action';
import { googleOAuth2Service } from '../../services/google-oauth-service';

export class GetGoogleAuthUrlAction extends AppAction {
  readonly method = 'get';
  route = 'google';
  validators = [];
  async process(request: Request, response: Response): Promise<void> {
    const url = googleOAuth2Service.getAuthUrl();

    response.json({ url });
  }
}
