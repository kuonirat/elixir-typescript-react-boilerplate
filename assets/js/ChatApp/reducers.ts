import {combineReducers, Reducer} from "redux";

import {IMainState} from "./state";

import {chat} from "./modules/chat/reducers";
import {flash} from "./modules/flash/reducers";

export const rootReducer: Reducer<IMainState> = combineReducers<IMainState>({
  chat,
  flash,
});
