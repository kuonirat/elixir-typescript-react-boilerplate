import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";

import {configureStore} from "./store";
import {ChatApp} from './ChatApp'

ReactDOM.render(
  <Provider store={configureStore()}>
    <ChatApp />
  </Provider>,
  document.querySelector("#react")
);
