import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import { Form, InputGroup } from 'react-bootstrap';
import context from '../../context';
import { postMessage } from './messagesSlice';

const netErrorMsg = 'App is trying to connect, so messages can’t be sent yet.';
let isSending = false;

const MessageBar = ({
  channelId,
  sendMessage,
}) => {
  const { userName } = useContext(context);
  const formik = useFormik({
    initialValues: {
      bodyMsg: '',
    },
    onSubmit: async ({ bodyMsg: text }, { resetForm, setErrors }) => {
      if (!text) return;
      isSending = true;
      setTimeout(() => {
        if (isSending) setErrors({ network: netErrorMsg });
      }, 200);// slow network
      try {
        await sendMessage({ channelId, userName, text });
        setErrors({ network: '' });
        resetForm();
      } catch (e) {
        console.error(e);
        setErrors({ network: netErrorMsg });
      }
      isSending = false;
    },
  });
  const {
    values, errors, isSubmitting, handleSubmit, handleChange,
  } = formik;
  const { network: errorMsg } = errors;
  return (
    <Form
      noValidate=""
      className=""
      onSubmit={(ev) => {
        ev.preventDefault();
        if (!isSubmitting) handleSubmit(ev);
      }}
    >
      <InputGroup>
        <Form.Control
          id="bodyMsg"
          name="bodyMsg"
          onChange={handleChange}
          value={values.bodyMsg}
        />
        <Form.Control.Feedback type="invalid">
          {errorMsg && errorMsg}
          &nbsp;
        </Form.Control.Feedback>
      </InputGroup>
    </Form>
  );
};

const mapStateToProps = ({ currentChannelId }) => ({
  channelId: currentChannelId,
});

const mapDispatchToProps = { sendMessage: postMessage };

export default connect(mapStateToProps, mapDispatchToProps)(MessageBar);
