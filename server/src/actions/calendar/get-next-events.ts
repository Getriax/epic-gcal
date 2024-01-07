import { Request, Response } from 'express';
import { AppAction } from '../../core/app-action';
import { GoogleCalendarService } from '../../services/google-calendar-service';

export class GetNextEventsAction extends AppAction {
  readonly method = 'get';
  route = 'events';
  validators = [];
  async process(request: Request, response: Response): Promise<void> {
    try {
      const { credentials } = await this.getUserAuth(request);
      if (!credentials) {
        response.sendStatus(401);
        return;
      }

      const calendar = new GoogleCalendarService(credentials);
      const events = await calendar.getNextCalendarEvents(10);

      response.json({ events });
    } catch (error) {
      console.error(error);
      response.status(500);
    }
  }
}
