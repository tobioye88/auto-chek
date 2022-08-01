export class ResponseHelper {
  static success<T>(data: T, message = 'success'): IResponseHelper<T> {
    return { data, message };
  }

  static error<T>(message: string, data: T | null): IResponseHelper<T> {
    return { data, message };
  }
}

export interface IResponseHelper<T> {
  message?: string;
  data: T;
}
