import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Messages from './Messages';
import MessageBar from './MessageBar';

const MessagesBox = () => (
  <Col className="d-flex flex-column h-100">
    <Row id="messages-box" className="chat-messages overflow-auto mb-3">
      <Col>
        <Messages />
      </Col>
    </Row>
    <Row className="mt-auto">
      <Col>
        <MessageBar />
      </Col>
    </Row>
  </Col>
);

export default MessagesBox;
