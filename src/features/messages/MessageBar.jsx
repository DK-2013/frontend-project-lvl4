import React from 'react';
import { connect } from 'react-redux';
import { postMessage, setCurrentMessage } from './messagesSlice';

const MessageBar = ({
  userName,
  channelId,
  message,
  errMsg,
  setCurrentMessage: inputHandle,
  postMessage: addMessage,
}) => {
  const onInputHandle = ({ target: { value } }) => inputHandle(value);

  const submitHandle = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const text = data.get('body');
    addMessage({
      userName, channelId, text,
    });
  };

  return (
    <form noValidate="" className="" onSubmit={submitHandle}>
      <div className="form-group">
        <div className="input-group">
          <input name="body" className="form-control" onChange={onInputHandle} value={message} />
          <div className="d-block invalid-feedback">
            {errMsg}
            &nbsp;
          </div>
        </div>
      </div>
    </form>
  );
};

const mapStateToProps = ({ currentChannelId, messages: { error, current }, userName }) => ({
  userName,
  channelId: currentChannelId,
  errMsg: error,
  message: current,
});

const mapDispatch = { setCurrentMessage, postMessage };

export default connect(mapStateToProps, mapDispatch)(MessageBar);
