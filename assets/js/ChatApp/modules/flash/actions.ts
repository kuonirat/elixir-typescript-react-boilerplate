import {ActionCreator, actionCreator, IPayloadAction, payloadActionCreator} from "../redux/actions";

import {IFlash} from "./IFlash";

export const SET_FLASH: string = "SET_FLASH";
export const setFlash: (payload: IFlash) => IPayloadAction<IFlash> = payloadActionCreator(SET_FLASH);

export const CLEAR_FLASH: string = "CLEAR_FLASH";
export const clearFlash: ActionCreator = actionCreator(CLEAR_FLASH);
