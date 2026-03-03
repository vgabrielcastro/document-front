import { config } from "@/lib/config";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new ApiError(
      (data as { message?: string })?.message ?? response.statusText,
      response.status,
      data,
    );
  }

  return data as T;
}

export const api = {
  get: <T>(path: string) =>
    fetch(`${config.apiUrl}${path}`).then(handleResponse<T>),

  post: <T>(path: string, body: unknown) =>
    fetch(`${config.apiUrl}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then(handleResponse<T>),

  patch: <T>(path: string, body: unknown) =>
    fetch(`${config.apiUrl}${path}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then(handleResponse<T>),

  delete: async (path: string) => {
    const response = await fetch(`${config.apiUrl}${path}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new ApiError(
        (data as { message?: string })?.message ?? response.statusText,
        response.status,
        data,
      );
    }
  },
};
