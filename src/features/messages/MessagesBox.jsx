import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import MessageBar from './MessageBar';

const MessagesBox = ({ messages, addMessage: addMsg }) => (
  <Col className="d-flex flex-column h-100">
    {/* todo scroll to last post */}
    <Row id="messages-box" className="chat-messages overflow-auto mb-3">
      <Col>
        {messages.map(({ id, text, userName }) => (
          <p key={id} className="mb-2">
            <b>{userName}</b>
            <br />
            {text}
          </p>
        ))}
      </Col>
    </Row>
    <Row className="mt-auto">
      <Col>
        <MessageBar addMessage={addMsg} />
      </Col>
    </Row>
  </Col>
);
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

export default connect(mapStateToProps)(MessagesBox);
