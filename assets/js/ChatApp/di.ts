import {Socket} from "phoenix";

import {IApiConfiguration} from "./modules/api/IApiConfiguration";
import {IApiService} from "./modules/api/IApiService";
import {IChatService} from "./modules/chat/IChatService";
import {ApiService} from "./modules/api/ApiService";
import {ChatService} from "./modules/chat/ChatService";

export interface IInjector {
  socket: Socket;
  chatService: IChatService;
}

const apiConfiguration: IApiConfiguration = {
  host: "localhost",
  port: 4000
};
const apiService: IApiService = new ApiService(apiConfiguration);
const chatService: IChatService = new ChatService(apiService);

const socket: Socket = new Socket("/socket");
socket.connect();

export const injector: IInjector = {
  chatService,
  socket
};
