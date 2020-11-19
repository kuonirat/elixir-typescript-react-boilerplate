import {includes} from "ramda";
import {Maybe, Some} from "monet";
import {Reducer} from "redux";

import {IPayloadAction} from "./actions";

export const createSetClearReducer: <D>(
  setActions: string[],
  clearActions: string[],
  initialState?: D
) => Reducer<Maybe<D>> = <D>(setActions: string[], clearActions: string[], initialState?: D) => (state: Maybe<D> = Maybe.fromNull(initialState), action) => {
  if (includes(action.type, setActions)) {
    return Some((action as IPayloadAction<D>).payload);
  } else if (includes(action.type, clearActions)) {
    return Maybe.fromNull(initialState);
  } else {
    return state;
  }
};
