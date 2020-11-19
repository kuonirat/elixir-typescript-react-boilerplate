import {IApiService} from "../api/IApiService";

import {IChatMessage} from "./IChatMessage";
import {IChatService, IStartChatResponse} from "./IChatService";
import {ISendTextMessageParams} from "./ISendTextMessageParams";

export class ChatService implements IChatService {

  constructor(private api: IApiService) {}

  public async start(): Promise<IStartChatResponse> {
    const response: Response = await this.api.post("/chat/start", {});
    return await this.accept200(response);
  }

  public async create_message(port: number, params: ISendTextMessageParams): Promise<IChatMessage> {
    const response: Response = await this.api.post("/chat/message/create", { port: port, ...params });
    return await this.accept200(response);
  }

  private async accept200<R>(response: Response): Promise<R> {
    const body: any = await response.json();

    if (response.status === 200) {
      return body;
    } else if (body.error != null) {
      return Promise.reject(new Error(body.error));
    } else {
      return Promise.reject(new Error("Unknown error"));
    }
  }
}
