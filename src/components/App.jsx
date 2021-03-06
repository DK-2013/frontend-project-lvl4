import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Channels from '../features/channels/Channels';
import MessagesBox from '../features/messages/MessagesBox';

const App = () => (
  <Row className="h-100 pb-3">
    <Col sm={3} className="border-right h-100">
      <Channels />
    </Col>
    <Col className="h-100">
      <MessagesBox />
    </Col>
  </Row>
);

export default App;
