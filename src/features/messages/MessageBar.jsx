import i18next from 'i18next';
import React, { useCallback, useContext } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { Formik } from 'formik';
import context from '../../context';
import { postMessage } from './messagesSlice';

const validationSchema = yup.object().shape({
  bodyMsg: yup.string().trim().required(' ').max(200),
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

/* let isSending = false;
  const checkNetwork = async (cb, setError) => {
  isSending = true;
  setTimeout(() => {
    if (isSending) setError();
  }, 200);// slow network
  await cb();
  isSending = false;
}; */

const MessageBar = () => {
  const { userName } = useContext(context);
  const channelId = useSelector(({ channels }) => channels.currentChannelId);
  const dispatch = useDispatch();

  const sendMessage = useCallback(async (data) => {
    await dispatch(postMessage(data));
  }, [dispatch]);

  const submitHandle = async (text, { resetForm, setErrors }) => {
    const setNetError = () => setErrors({ network: i18next.t('networkError') });
    const cleanNetError = () => setErrors({ network: '' });

    try {
      await sendMessage({ channelId, userName, text });
      cleanNetError();
      resetForm();
    } catch (e) {
      console.error(e);
      setNetError();
    }
  };
  return (
    <Formik
      initialValues={{ bodyMsg: '' }}
      validationSchema={validationSchema}
      onSubmit={async ({ bodyMsg: text }, formikHelpers) => {
        await submitHandle(text, formikHelpers);
      }}
      component={SubmitForm}
    />
  );
};

export default MessageBar;
