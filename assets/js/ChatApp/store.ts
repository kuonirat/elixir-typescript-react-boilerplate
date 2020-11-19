import {injector} from "./di";
import {applyMiddleware, compose, createStore, Middleware, Store} from "redux";
import createSagaMiddleware, {SagaMiddleware} from "redux-saga";

import {rootReducer} from "./reducers";
import {rootSaga} from "./sagas";
import {IMainState} from "./state";
import {ISagaContext} from "./ISagaContext";

export const configureStore: () => Store<IMainState> = () => {
  const context: ISagaContext = { injector };
  const sagaMiddleware: SagaMiddleware = createSagaMiddleware<ISagaContext>({ context });
  const middlewares: Middleware[] = [ sagaMiddleware ];
  const enhancedCompose: any = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store: Store<IMainState> = createStore(rootReducer, enhancedCompose(applyMiddleware(...middlewares)));
  sagaMiddleware.run(rootSaga);
  return store;
};
