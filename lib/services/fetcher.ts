export type TFetchResult<T> = {
  status: number;
  message: string;
  data: T | null;
};

class MyFetch {
  private _url = "";
  private _opts: any = {};
  private _errMesage = "Request error";

  constructor(url: string, opts: RequestInit) {
    this._url = url;
    this._opts = opts;
  }

  errorMessage(errMesage: string) {
    this._errMesage = errMesage;
    return this;
  }

  async execute<T>(): Promise<T> {
    const token = localStorage.getItem("accessToken");
    if (token) this._opts.headers["Authorization"] = `Bearer ${token}`;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}${this._url}`,
        this._opts,
      );
      const json = await res.json().catch(() => null);

      if (!res.ok) throw new Error(json?.message || this._errMesage);
      else return json as T;
    } catch (err: any) {
      throw new Error(err?.message || this._errMesage);
    }
  }
}

const initRequest = (body?: any) => {
  const headers: any = { "Content-Type": "application/json" };
  if (!body) return { headers };
  if (body instanceof FormData) return { body, headers: {} };
  return { body: JSON.stringify(body), headers };
};

const createMethod = (method: string) => (url: string, body?: any) =>
  new MyFetch(url, { method, ...initRequest(body) });
export const myfetch = {
  get: createMethod("GET"),
  post: createMethod("POST"),
  put: createMethod("PUT"),
  patch: createMethod("PATCH"),
  delete: createMethod("DELETE"),
};
