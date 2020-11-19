export interface IApiService {
  post<B extends {}>(path: string, body: B): Promise<Response>
}