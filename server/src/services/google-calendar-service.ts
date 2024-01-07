import { UserAuth } from '../repositories/user-auth.repository';
import {
  CalendarEvent,
  CalendarEventsList,
  EventItem,
} from '../types/google-calendar.types';
import { GoogleApiService } from './google-api-service';

export class GoogleCalendarService {
  private api: GoogleApiService;
  constructor(credentials: UserAuth) {
    this.api = new GoogleApiService(credentials);
  }

  async getNextCalendarEvents(limit: number) {
    const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=${limit}&orderBy=startTime&singleEvents=true&timeMin=${encodeURIComponent(
      new Date().toISOString()
    )}`;

    const data: CalendarEventsList = await this.api.request(url);
    const events = data.items;
    if (!events || events.length === 0) {
      console.log('No upcoming events found.');
      return [];
    }

    return events.map((event: CalendarEvent) =>
      this.mapCalendarEventToEventItem(event)
    );
  }

  mapCalendarEventToEventItem(calendarEvent: CalendarEvent): EventItem {
    return {
      name: calendarEvent?.summary,
      date: new Date(
        calendarEvent.start.dateTime || calendarEvent.start.date
      ).toISOString(),
      attendees: calendarEvent.attendees
        ? calendarEvent.attendees.map((a) => ({
            name: a.displayName,
            email: a.email,
          }))
        : [],
      location: calendarEvent?.location,
      description: calendarEvent?.description,
      organizer:
        calendarEvent?.organizer?.displayName ||
        calendarEvent?.organizer?.email,
      created: new Date(calendarEvent.created).toISOString(),
      updated: new Date(calendarEvent.updated).toISOString(),
    };
  }
}
