import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addMessage } from './messagesSlice';

const getSubmitHandle = ({ setInputMessage, addMsg, channelId }) => (e) => {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  addMsg(channelId, data.get('body'));
  setInputMessage('');
};

const MessageBar = ({ currentChannelId: channelId, addMessage: addMsg }) => {
  const [inputMessage, setInputMessage] = useState('');
  const inputHandle = ({ target: { value } }) => setInputMessage(value);

  return (
    <form noValidate="" className="" onSubmit={getSubmitHandle({ setInputMessage, addMsg, channelId })}>
      <div className="form-group">
        <div className="input-group">
          <input name="body" className="form-control" onChange={inputHandle} value={inputMessage} />
          <div className="d-block invalid-feedback">&nbsp;</div>
        </div>
      </div>
    </form>
  );
};

const mapStateToProps = ({ currentChannelId }) => ({ currentChannelId });

const mapDispatch = { addMessage };

export default connect(mapStateToProps, mapDispatch)(MessageBar);
