import { AppController } from '../core/app-controller';
import { GetGoogleAuthUrlAction } from '../actions/auth/get-google-auth-url';
import { GetGoogleAuthTokenAction } from '../actions/auth/get-google-auth-token';
import { DisconnectUserAction } from '../actions/auth/disconnect-user';

export class AuthController extends AppController {
  path = '/auth';
  actions = [
    GetGoogleAuthUrlAction,
    GetGoogleAuthTokenAction,
    DisconnectUserAction,
  ];
}
