export interface IAction {
  type: string;
}

export interface IPayloadAction<T> extends IAction {
  payload: T;
}

export type ActionCreator = () => IAction;
export const actionCreator: (type: string) => ActionCreator = (type) => () => ({ type });
export const payloadActionCreator: <P>(type: string) => (payload: P) => IPayloadAction<P> = (type) => (payload) => ({
  type,

  payload
});
