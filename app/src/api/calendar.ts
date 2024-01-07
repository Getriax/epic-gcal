import { MakeApiRequestFunc, makeApiRequestProvider } from './request.ts';
import { UrlResponse } from './auth.ts';

export const getNextEvents = makeApiRequestProvider(
  (makeApiRequest: MakeApiRequestFunc<UrlResponse>) => () =>
    makeApiRequest('calendar/events', {
      method: 'GET',
      auth: true,
    })
);
