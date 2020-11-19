import isEmpty from "ramda/es/isEmpty";
import React from "react";
import {Dispatch} from "redux";
import {connect, ConnectedComponent} from "react-redux";
import {ErrorMessage, Field, FieldProps, Form, Formik, FormikHelpers} from "formik";

import {ISendTextMessageParams} from "../../modules/chat/ISendTextMessageParams";
import {extractErrors} from "../../modules/forms/validation/extractErrors";
import {required} from "../../modules/forms/validation/validators/required";
import {sendTextMessage} from "../../modules/chat/actions";

interface ISendChatMessageDataShape {
  text: string;
}

interface IDispatchProps {
  sendTextMessage(data: ISendTextMessageParams, actions: FormikHelpers<Partial<ISendChatMessageDataShape>>): void;
}

interface IProps extends IDispatchProps {
}

const initialValues: ISendChatMessageDataShape = {
  text: "",
};

class SendChatMessageFormComponent extends React.Component<IProps, {}> {

  public render(): JSX.Element {

    return (
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => this.props.sendTextMessage(
          {
            text: values.text as string
          },
          actions
        )}
        validate={(values: Partial<ISendChatMessageDataShape>) => extractErrors({
          text: required(values.text),
        })}
      >{({isSubmitting, errors}) => (
        <Form>
          <fieldset>
            <Field name="text">{(props: FieldProps<string>) =>
              <>
                <input id={props.field.name} type="text" {...props.field} />
                <ErrorMessage name={props.field.name}>
                  {(message) => (
                    <div>
                      {message}
                    </div>
                  )}
                </ErrorMessage>
              </>
            }</Field>
            <input type="submit" value="send" disabled={isSubmitting || !isEmpty(errors)} />
          </fieldset>
        </Form>
      )}</Formik>
    );
  }
}

export const SendChatMessageForm: ConnectedComponent<typeof SendChatMessageFormComponent, {}> = connect<{}, IDispatchProps>(
  () => ({}),
  (dispatch: Dispatch): IDispatchProps => ({
    sendTextMessage(data: ISendTextMessageParams, actions: FormikHelpers<ISendChatMessageDataShape>): void {
      dispatch(sendTextMessage(data, actions));
    }
  })
)(SendChatMessageFormComponent);
