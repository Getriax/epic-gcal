import {
  UserAuth,
  userAuthRepository,
} from '../repositories/user-auth.repository';
import { googleOAuth2Service } from './google-oauth-service';

export class GoogleApiService {
  constructor(private credentials: UserAuth) {}

  async request(
    url: string,
    method: string = 'GET',
    headers?: HeadersInit,
    body?: Record<string, unknown>
  ) {
    if (!this.credentials?.access_token) {
      return null;
    }

    let accessToken = this.credentials.access_token;
    const expiryDate = this.credentials.expiry_date as number;

    accessToken = await this.refreshTokenIfNeeded(accessToken, expiryDate);

    const response = await fetch(url, {
      method: method,
      headers: {
        ...headers,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  async refreshTokenIfNeeded(accessToken: string, expiryDate: number) {
    // Check if the access token is close to expiry (e.g., 5 minutes before)
    const isTokenExpiringSoon = expiryDate - Date.now() < 5 * 60 * 1000;

    if (!isTokenExpiringSoon) {
      return accessToken;
    }

    const refreshedToken = await this.refreshAccessToken();
    return refreshedToken || accessToken;
  }

  private async refreshAccessToken() {
    if (!this.credentials?.refresh_token) {
      return;
    }

    const tokens = await googleOAuth2Service.refreshAccessToken(
      this.credentials.refresh_token
    );
    if (!tokens?.id_token || !tokens?.access_token) {
      return;
    }

    await userAuthRepository.saveUserToken(tokens.id_token, tokens);

    return tokens.access_token;
  }
}
