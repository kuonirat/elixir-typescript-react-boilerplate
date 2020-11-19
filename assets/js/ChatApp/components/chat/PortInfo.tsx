import {Maybe} from "monet";
import React from "react";
import {connect, ConnectedComponent} from "react-redux";

import {IMainState} from "../../state";

interface IStateProps {
  port: Maybe<number>;
}

interface IProps extends IStateProps {}

class PortInfoComponent extends React.Component<IProps, {}> {

  public render(): JSX.Element {
    return <div>{this.props.port.cata(
      () => "Chat port not set",
      (port) => `Listening on port ${port}...`
    )}</div>;
  }
}

export const PortInfo: ConnectedComponent<typeof PortInfoComponent, {}> = connect<IProps>(
  (state: IMainState): IStateProps => ({ port: state.chat.port })
)(PortInfoComponent);
