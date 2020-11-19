import React from "react";
import {connect, ConnectedComponent} from "react-redux";

import {IMainState} from "../../state";
import {IChatMessage} from "../../modules/chat/IChatMessage";

interface IStateProps {
  messages: IChatMessage[];
}

interface IProps extends IStateProps {}

class ChatMessagesComponent extends React.Component<IProps, {}> {

  public render(): JSX.Element {
    return <>
      {this.props.messages.map(message => <div key={message.id}>{message.text}</div>)}
    </>;
  }
}

export const ChatMessages: ConnectedComponent<typeof ChatMessagesComponent, {}> = connect<IProps>(
  (state: IMainState): IStateProps => ({ messages: state.chat.messages })
)(ChatMessagesComponent);
