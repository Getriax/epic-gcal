import { IRequestOptions } from './request';
import { disconnectUser, getRedirectUrl, getToken } from './auth.ts';
import { getNextEvents } from './calendar.ts';

const baseUrl = 'https://epic-5jvzkowqrq-lm.a.run.app/';

export const useApi = () => {
  const token = localStorage.getItem('auth');
  const makeApiRequest = <T = unknown>(
    uri: string,
    options: IRequestOptions = {}
  ): Promise<T | null> => {
    if (options.auth && !token) {
      console.error('User is not authenticated to make this request');
      return Promise.resolve(null);
    }

    const queryString =
      options.query && Object.keys(options.query).length > 0
        ? `?${new URLSearchParams(options.query).toString()}`
        : '';

    return fetch(`${baseUrl}${uri}${queryString}`, {
      method: options.method || 'GET',
      ...(options.body && { body: JSON.stringify(options.body) }),
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: token }),
      },
    })
      .then((response) => {
        console.log({ stat: response.status });
        if (response.status === 401) {
          console.error('Unauthorized');
          localStorage.removeItem('auth');
          return null;
        }

        if (['4', '5'].includes(response.status.toString()[0])) {
          return null;
        }

        return response.json();
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  };

  return {
    auth: {
      getRedirectUrl: getRedirectUrl(makeApiRequest),
      getToken: getToken(makeApiRequest),
      disconnectUser: disconnectUser(makeApiRequest),
    },
    calendar: {
      getNextEvents: getNextEvents(makeApiRequest),
    },
  };
};
