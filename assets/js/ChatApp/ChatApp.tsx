import React from "react"
import {connect, ConnectedComponent} from "react-redux";

import {IMainState} from "./state";
import {PortInfo} from "./components/chat/PortInfo";
import {Flash} from "./components/Flash";
import {ChatMessages} from "./components/chat/ChatMessages";
import {SendChatMessageForm} from "./components/chat/SendChatMessageForm";

interface IStateProps {
  waitForAClient: boolean;
}

interface IProps extends IStateProps {}

class ChatAppComponent extends React.Component<IProps, {}> {

  public render(): JSX.Element {
    return <>
      <Flash />
      <PortInfo />
      {this.props.waitForAClient ?
        <div>Waiting for a client...</div> 
        :
        <>
          <ChatMessages />
          <SendChatMessageForm />
        </>
      }
    </>;
  }
}

export const ChatApp: ConnectedComponent<typeof ChatAppComponent, {}> = connect<IProps>(
  (state: IMainState): IStateProps => ({ waitForAClient: state.chat.messages.length === 0 })
)(ChatAppComponent);
