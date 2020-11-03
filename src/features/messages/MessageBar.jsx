import i18next from 'i18next';
import React, { useContext } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { Formik } from 'formik';
import context from '../../context';
import { postMessage } from './messagesSlice';

let isSending = false;

const validationSchema = yup.object().shape({
  bodyMsg: yup.string().trim().max(200),
});

const SubmitForm = ({
  values, errors, isSubmitting, handleSubmit, handleChange,
}) => (
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
        disabled={isSubmitting}
        onChange={handleChange}
        value={values.bodyMsg}
        ref={(inp) => { if (inp) inp.focus(); }}
      />
      <Form.Control.Feedback type="invalid" className="d-block">
        {(errors.network || errors.bodyMsg)}
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

  const submitHandle = async (text, { resetForm, setErrors }) => {
    const netErrorMsg = i18next.t('networkError');

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
  };
  return (
    <Formik
      initialValues={{ bodyMsg: '' }}
      validationSchema={validationSchema}
      onSubmit={async ({ bodyMsg: text }, formikHelpers) => {
        if (text.trim()) {
          await submitHandle(text, formikHelpers);
        }
      }}
      component={SubmitForm}
    />
  );
};

const mapStateToProps = ({ channels: { currentChannelId: channelId } }) => ({ channelId });

const mapDispatchToProps = { sendMessage: postMessage };

export default connect(mapStateToProps, mapDispatchToProps)(MessageBar);
