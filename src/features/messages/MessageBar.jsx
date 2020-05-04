import React from 'react';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import postMessageRequest from '../../api/http';

const netErrorMsg = 'App is trying to connect, so messages can’t be sent yet.';

const MessageBar = ({
  userName,
  channelId,
}) => {
  const formik = useFormik({
    initialValues: {
      bodyMsg: '',
    },
    onSubmit: async ({ bodyMsg: text }, { resetForm, setErrors }) => {
      try {
        await postMessageRequest({ channelId, userName, text });
        resetForm();
      } catch (e) {
        console.error(e);
        setErrors({ network: netErrorMsg });
      }
    },
  });

  const { network: errorMsg } = formik.errors;
  return (
    <form noValidate="" className="" onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <div className="input-group">
          <input
            id="bodyMsg"
            name="bodyMsg"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.bodyMsg}
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

export default connect(mapStateToProps)(MessageBar);
