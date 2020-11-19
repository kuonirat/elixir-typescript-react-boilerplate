import {Maybe} from "monet";

import {IFlash} from "./modules/flash/IFlash";
import {IChatState} from "./modules/chat/state";

export interface IMainState {
  flash: Maybe<IFlash>;
  chat: IChatState;
}
