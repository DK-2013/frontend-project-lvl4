import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import MessageBar from './MessageBar';

const MessagesBox = ({ messages, addMessage: addMsg }) => (
  <div className="col h-100">
    <div className="d-flex flex-column h-100">
      <div id="messages-box" className="chat-messages overflow-auto mb-3">
        {messages.map(({ id, text, userName }) => (
          <div key={id} className="mb-2">
            <div><b>{userName}</b></div>
            {text}
          </div>
        ))}
      </div>
      <div className="mt-auto">
        <MessageBar addMessage={addMsg} />
      </div>
    </div>
  </div>
);
const selectMessages = ({ messages }) => messages;
const selectChannel = ({ currentChannelId }) => currentChannelId;

const selectChannelMessages = createSelector(
  [selectMessages, selectChannel],
  (messages, channelId) => messages.filter((msg) => msg.channelId === channelId),
);

const mapStateToProps = (state) => ({
  messages: selectChannelMessages(state),
});

export default connect(mapStateToProps)(MessagesBox);
