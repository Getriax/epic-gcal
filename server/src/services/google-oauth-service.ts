import { OAuth2Client } from 'google-auth-library';
import { UserAuth } from '../repositories/user-auth.repository';

class GoogleOAuthService {
  private oAuth2Client: OAuth2Client;
  constructor() {
    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
    const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

    this.oAuth2Client = new OAuth2Client(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URI
    );
  }

  getAuthUrl() {
    const scopes = [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/calendar.events.readonly',
    ];

    return this.oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
    });
  }

  async verifyToken(token: string) {
    const ticket = await this.oAuth2Client.verifyIdToken({
      idToken: token,
    });

    const payload = ticket.getPayload();
    return payload ? payload.email : null;
  }

  async getTokens(
    code: string
  ): Promise<{ tokens: UserAuth; email: string } | null> {
    const { tokens } = await this.oAuth2Client.getToken(code);
    if (!tokens?.id_token) {
      return null;
    }

    const email = await this.verifyToken(tokens.id_token);
    if (!email) {
      return null;
    }

    return { tokens, email };
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      this.oAuth2Client.setCredentials({
        refresh_token: refreshToken,
      });
      const { credentials } = await this.oAuth2Client.refreshAccessToken();
      return credentials;
    } catch (error) {
      console.error('Error refreshing access token:', error);
      throw error;
    }
  }
}

export const googleOAuth2Service = new GoogleOAuthService();
