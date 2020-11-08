import { useSelector } from 'react-redux';
import React from 'react';

const channelMessagesSelector = ({ messages, currentChannelId }) => messages
  .filter(({ channelId }) => channelId === currentChannelId);

const renderMessage = ({ id, text, userName }) => (
  <p key={id} className="mb-2">
    <b>{userName}</b>
    <br />
    {text}
  </p>
);
/* todo scroll to last post */
const Messages = () => {
  const messages = useSelector(channelMessagesSelector);
  return messages.map(renderMessage);
};

export default Messages;
