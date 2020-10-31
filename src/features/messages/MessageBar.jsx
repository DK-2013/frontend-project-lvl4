import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { Form, InputGroup } from 'react-bootstrap';
import context from '../../context';
import { postMessage } from './messagesSlice';

const netErrorMsg = 'App is trying to connect, so messages can’t be sent yet.';
let isSending = false;

const SubmitForm = ({
  values, errors: { network: errorMsg }, isSubmitting, handleSubmit, handleChange,
}) => (
  <Form
    noValidate=""
    className=""
    onSubmit={(ev) => { // todo return focus to input after submit
      ev.preventDefault();
      if (!isSubmitting) handleSubmit(ev);
    }}
  >
    <InputGroup>
      <Form.Control
        id="bodyMsg"
        name="bodyMsg"
        disabled={isSubmitting}
        onChange={handleChange}
        value={values.bodyMsg}
      />
      <Form.Control.Feedback type="invalid" className="d-block">
        {errorMsg && errorMsg}
        &nbsp;
      </Form.Control.Feedback>
    </InputGroup>
  </Form>
);

const MessageBar = ({
  channelId,
  sendMessage,
}) => {
  const { userName } = useContext(context);
  const dispatch = async (text) => sendMessage({ channelId, userName, text });
  return (
    <Formik
      initialValues={{ bodyMsg: '' }}
      onSubmit={async ({ bodyMsg: text }, { resetForm, setErrors }) => {
        if (!text) return;
        isSending = true;
        setTimeout(() => {
          if (isSending) setErrors({ network: netErrorMsg });
        }, 200);// slow network
        try {
          await dispatch(text);
          setErrors({ network: '' });
          resetForm();
        } catch (e) {
          console.error(e);
          setErrors({ network: netErrorMsg });
        }
        isSending = false;
      }}
      component={SubmitForm}
    />
  );
};

const mapStateToProps = ({ channels: { currentChannelId } }) => ({ currentChannelId });

const mapDispatchToProps = { sendMessage: postMessage };

export default connect(mapStateToProps, mapDispatchToProps)(MessageBar);
