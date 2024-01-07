import { MakeApiRequestFunc, makeApiRequestProvider } from './request.ts';

export interface EventItem {
  name: string;
  date: string;
  attendees: Attendee[];
  location: string;
  description: string;
  organizer: string;
  created: string;
  updated: string;
}

export interface Attendee {
  name: string;
  email: string;
}

export const getNextEvents = makeApiRequestProvider(
  (makeApiRequest: MakeApiRequestFunc<{ events: EventItem[] }>) => () =>
    makeApiRequest('calendar/events', {
      method: 'GET',
      auth: true,
    })
);
