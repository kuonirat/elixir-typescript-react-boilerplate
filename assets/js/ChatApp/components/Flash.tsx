import {Maybe} from "monet";
import React from "react";
import {connect, ConnectedComponent} from "react-redux";

import {IFlash} from "../modules/flash/IFlash";
import {IMainState} from "../state";

import {OrNothing} from "./OrNothing";

interface IStateProps {
  flash: Maybe<IFlash>;
}

interface IProps extends IStateProps {}

class FlashComponent extends React.Component<IProps, {}> {

  public render(): JSX.Element {

    return <OrNothing maybe={this.props.flash}>{(flash) => {
      let level: string | null = null;

      switch (flash.level) {
        case "error":
          level = "danger";
          break;
        case "success":
          level = "info";
          break;
        default:
          level = "info";
          break;
      }

      return <div className={`alert alert-${level}`}>{flash.message}</div>;
    }}</OrNothing>;
  }
}

export const Flash: ConnectedComponent<typeof FlashComponent, {}> = connect<IProps>(
  (state: IMainState): IStateProps => ({ flash: state.flash })
)(FlashComponent);
