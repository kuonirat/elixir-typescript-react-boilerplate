import {IChatMessage} from "./IChatMessage";
import {ISendTextMessageParams} from "./ISendTextMessageParams";

export interface IStartChatResponse {
  port: number;
}

export interface IChatService {
  start(): Promise<IStartChatResponse>;
  create_message(port: number, params: ISendTextMessageParams): Promise<IChatMessage>;
}