export interface IRequestOptions {
  method?: 'POST' | 'GET' | 'DELETE' | 'PUT';
  body?: Record<string, unknown>;
  query?: Record<string, string>;
  auth?: boolean;
}

export type MakeApiRequestFunc<Ret = unknown> = (
  uri: string,
  options?: IRequestOptions
) => Promise<Ret | null>;
export const makeApiRequestProvider = <Ret = unknown, Params = unknown>(
  func: (
    makeApiReq: MakeApiRequestFunc<Ret>
  ) => (params: Params) => Promise<Ret | null>
) => {
  return func;
};
