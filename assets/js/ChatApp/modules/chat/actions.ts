import {FormikHelpers} from "formik";

import {IFormAction} from "../forms/actions";
import {IPayloadAction, payloadActionCreator} from "../redux/actions";

import {IChatMessage} from "./IChatMessage";
import {ISendTextMessageParams} from "./ISendTextMessageParams";

export const SEND_TEXT_MESSAGE: string = "SEND_TEXT_MESSAGE";
export const sendTextMessage: (
  payload: ISendTextMessageParams,
  helpers: FormikHelpers<ISendTextMessageParams>,
) => IPayloadAction<ISendTextMessageParams> & IFormAction<ISendTextMessageParams> = (payload, helpers) => ({
  type: SEND_TEXT_MESSAGE,

  helpers,
  payload,
});


export const RECEIVE_CHAT_MESSAGE: string = "RECEIVE_CHAT_MESSAGE";
export const receiveChatMessage: (payload: IChatMessage) => IPayloadAction<IChatMessage> = payloadActionCreator(RECEIVE_CHAT_MESSAGE);

export const SET_PORT: string = "SET_PORT";
export const setPort: (payload: number) => IPayloadAction<number> = payloadActionCreator(SET_PORT);