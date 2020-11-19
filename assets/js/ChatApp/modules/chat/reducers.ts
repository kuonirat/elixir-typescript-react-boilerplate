import {Maybe} from "monet";
import {combineReducers, Reducer} from "redux";

import {IPayloadAction} from "../redux/actions";
import {createSetClearReducer} from "../redux/reducers";

import {RECEIVE_CHAT_MESSAGE, SET_PORT} from "./actions";
import {IChatMessage} from "./IChatMessage";
import {IChatState} from "./state";

const port: Reducer<Maybe<number>> = createSetClearReducer([SET_PORT], []);

const messages: Reducer<IChatMessage[]> = (state = [], action) => {

  switch (action.type) {
    case RECEIVE_CHAT_MESSAGE:
      return [...state, (action as IPayloadAction<IChatMessage>).payload];
    default:
      return state;
  }
}

export const chat: Reducer<IChatState> = combineReducers<IChatState>({
  port,
  messages
});
