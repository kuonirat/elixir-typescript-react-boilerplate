import {Maybe} from "monet";
import React from "react";

interface IProps<T> {
  maybe: Maybe<T>;
  children(something: T): JSX.Element;
}

export class OrNothing<T> extends React.Component<IProps<T>, {}> {

  public render(): JSX.Element {
    return this.props.maybe.cata(() => <></>, this.props.children);
  }
}
