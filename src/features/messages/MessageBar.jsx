import React from 'react';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import { postMessage } from './messagesSlice';

const netErrorMsg = 'App is trying to connect, so messages can’t be sent yet.';
let isSending = false;

const MessageBar = ({
  userName,
  channelId,
  sendMessage,
}) => {
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
    <form
      noValidate=""
      className=""
      onSubmit={(ev) => {
        ev.preventDefault();
        if (!isSubmitting) handleSubmit(ev);
      }}
    >
      <div className="form-group">
        <div className="input-group">
          <input
            id="bodyMsg"
            name="bodyMsg"
            className="form-control"
            onChange={handleChange}
            value={values.bodyMsg}
          />
          <div className="d-block invalid-feedback">
            {errorMsg && errorMsg}
            &nbsp;
          </div>
        </div>
      </div>
    </form>
  );
};

const mapStateToProps = ({ currentChannelId, userName }) => ({
  userName,
  channelId: currentChannelId,
});

const mapDispatchToProps = { sendMessage: postMessage };

export default connect(mapStateToProps, mapDispatchToProps)(MessageBar);
