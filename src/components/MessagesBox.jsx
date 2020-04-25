import React from 'react';
import MessageBar from './MessageBar';

const MessagesBox = () => (
  <div className="col h-100">
    <div className="d-flex flex-column h-100">
      <div id="messages-box" className="chat-messages overflow-auto mb-3" />
      <div className="mt-auto">
        <MessageBar />
      </div>
    </div>
  </div>
);

export default MessagesBox;
