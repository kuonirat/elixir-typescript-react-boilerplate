import {all} from "redux-saga/effects";

import {chat} from "./modules/chat/sagas";

export const rootSaga: () => IterableIterator<any> = function*(): IterableIterator<any> {
  yield all([
    chat(),
  ]);
};
