import {EventChannel, eventChannel} from "redux-saga";
import {all, put, take, takeLatest, getContext, select} from "redux-saga/effects";
import {Channel} from "phoenix";

import {IInjector} from "../../di";
import {IMainState} from "../../state";

import {IPayloadAction} from "../redux/actions";
import {IFormAction} from "../forms/actions";
import {clearFlash, setFlash} from "../flash/actions";
import {receiveChatMessage, SEND_TEXT_MESSAGE, setPort} from "../chat/actions";
import {join} from "../socket/channel";

import {ISendTextMessageParams} from "./ISendTextMessageParams";
import {IStartChatResponse} from "./IChatService";
import {IChatMessage} from "./IChatMessage";

const startWebSocket: () => IterableIterator<any> = function*(): IterableIterator<any> {
  try {
    const injector: IInjector = (yield getContext("injector")) as unknown as IInjector;
    const startChatResponse: IStartChatResponse = (yield injector.chatService.start()) as unknown as IStartChatResponse;
    const port: number = startChatResponse.port;

    yield put(setPort(port));

    const topic: string = `chat:${port}`;
    const channel: Channel = injector.socket.channel(topic, {});
    const newMessages: EventChannel<IChatMessage> = (yield eventChannel(emitter => {
      channel.on("new_message", emitter);
      return () => {}
    })) as unknown as EventChannel<IChatMessage>;;

    yield join(channel);

    while (true) {
      const message: IChatMessage = (yield take(newMessages)) as unknown as IChatMessage;
      yield put(receiveChatMessage(message));
    }

  } catch (error) {
    console.error("error caught", error);
    yield put(setFlash({ message: error.message, level: "error" }));
  }
};

const sendTextMessage: (
  action: IPayloadAction<ISendTextMessageParams> & IFormAction<ISendTextMessageParams>
) => IterableIterator<any> = function*(action: IPayloadAction<ISendTextMessageParams> & IFormAction<ISendTextMessageParams>): IterableIterator<any> {
  try {
    const injector: IInjector = (yield getContext("injector")) as unknown as IInjector;
    const state: IMainState = (yield select()) as unknown as IMainState;
    yield put(clearFlash());

    yield state.chat.port.cata(
      function*(): IterableIterator<any> {
        yield put(setFlash({ message: "Cannot send message. The port is not set.", level: "error" }));
      },
      function*(port: number): IterableIterator<any> {
        yield injector.chatService.create_message(port, action.payload);
      }
    );

    action.helpers.resetForm();
    action.helpers.setSubmitting(false);
  } catch (error) {
    action.helpers.setSubmitting(false);
    yield put(setFlash({ message: error.message, level: "error" }));
  }
};

const watchSendTextMessage: () => IterableIterator<any> = function*(): IterableIterator<any> {
  yield takeLatest(SEND_TEXT_MESSAGE, sendTextMessage);
};

export const chat: () => IterableIterator<any> = function*(): IterableIterator<any> {
  yield all([
    startWebSocket(),
    watchSendTextMessage(),
  ]);
};
