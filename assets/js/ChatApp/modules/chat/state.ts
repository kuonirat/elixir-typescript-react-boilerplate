import {IChatMessage} from "./IChatMessage";
import {Maybe} from "monet";

export interface IChatState {
  port: Maybe<number>;
  messages: IChatMessage[];
}
