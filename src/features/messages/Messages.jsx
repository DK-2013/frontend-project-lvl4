import { createSelector } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import React from 'react';

const renderMessage = ({ id, text, userName }) => (
  <p key={id} className="mb-2">
    <b>{userName}</b>
    <br />
    {text}
  </p>
);
/* todo scroll to last post */
const Messages = ({ messages }) => messages.map(renderMessage);

const selectMessages = ({ messages }) => messages;
const selectChannel = ({ channels: { currentChannelId } }) => currentChannelId;

const selectChannelMessages = createSelector(
  [selectMessages, selectChannel],
  ({ byId, ids }, currentChannelId) => ids.map((msgId) => byId[msgId])
    .filter((msg) => msg.channelId === currentChannelId),
);

const mapStateToProps = (state) => ({
  messages: selectChannelMessages(state),
});

export default connect(mapStateToProps)(Messages);
