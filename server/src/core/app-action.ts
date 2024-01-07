import { Request, Response, NextFunction } from 'express';
import { userAuthRepository } from '../repositories/user-auth.repository';
import { googleOAuth2Service } from '../services/google-oauth-service';
export abstract class AppAction {
  abstract method: 'get' | 'post' | 'put' | 'delete';
  abstract route: string;
  abstract validators: ((
    req: Request,
    res: Response,
    next: NextFunction
  ) => unknown)[];

  abstract process(request: Request, response: Response): Promise<void>;

  getAuthToken(request: Request): string | undefined {
    return request.header('Authorization');
  }

  async getUserAuth(request: Request) {
    try {
      const token = this.getAuthToken(request);
      if (!token) {
        return {};
      }

      const email = await googleOAuth2Service.verifyToken(token);
      if (!email) {
        return {};
      }

      const credentials = await userAuthRepository.getUserToken(email);
      return { email, credentials };
    } catch (error) {
      console.error('Error getting user auth:', error);
      return {};
    }
  }
}
