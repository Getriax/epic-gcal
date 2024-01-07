import { MakeApiRequestFunc, makeApiRequestProvider } from './request';

export interface UrlResponse {
  url: string;
}

export interface TokenResponse {
  token: string;
}

export const getRedirectUrl = makeApiRequestProvider(
  (makeApiRequest: MakeApiRequestFunc<UrlResponse>) => () =>
    makeApiRequest('auth/google', {
      method: 'GET',
    })
);

export const getToken = makeApiRequestProvider(
  (makeApiRequest: MakeApiRequestFunc<TokenResponse>) =>
    ({ code }: { code: string }) =>
      makeApiRequest('auth/google/token', {
        method: 'GET',
        query: { code },
      })
);
