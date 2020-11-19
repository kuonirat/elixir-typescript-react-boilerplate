import {Maybe} from "monet";
import {Reducer} from "redux";

import {createSetClearReducer} from "../redux/reducers";

import {CLEAR_FLASH, SET_FLASH} from "./actions";
import {IFlash} from "./IFlash";

export const flash: Reducer<Maybe<IFlash>> = createSetClearReducer<IFlash>([ SET_FLASH ], [ CLEAR_FLASH ]);
