import { IRequestOptions } from './request';
import { getRedirectUrl, getToken } from './auth.ts';
import { getNextEvents } from './calendar.ts';

const baseUrl = 'http://localhost:3000/';

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
      .then((response) => response.json())
      .catch((error) => {
        console.error(error);
        return null;
      });
  };

  return {
    auth: {
      getRedirectUrl: getRedirectUrl(makeApiRequest),
      getToken: getToken(makeApiRequest),
    },
    calendar: {
      getNextEvents: getNextEvents(makeApiRequest),
    },
  };
};
