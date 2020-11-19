import {IApiConfiguration} from "./IApiConfiguration";
import {IApiService as IApiService} from "./IApiService";

export class ApiService implements IApiService {

  constructor(private configuration: IApiConfiguration) {}

  post<B extends {}>(path: string, body: B): Promise<Response> {
    return fetch(
      this.makeUrl(path),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      }
    );
  }

  private makeUrl(path: string): string {
    return `http://${this.configuration.host}:${this.configuration.port}/api${path}`;
  }
}