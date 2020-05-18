import React, { useState } from 'react';
import { connect } from 'react-redux';
import cookies from 'js-cookie';
import { Col, ListGroup } from 'react-bootstrap';
import { switchChannel } from './currentChannelSlice';
import Header from './Header';
import ChannelModal from './ChannelModal';

const getRenderChannel = (currentChannelId, toggleChannel) => ({ id, name }) => {
  const active = currentChannelId === id;
  return (
    <ListGroup.Item
      key={id}
      active={active}
      onClick={() => {
        cookies.set('currentChannelId', id);
        toggleChannel(id);
      }}
    >
      {name}
    </ListGroup.Item>
  );
};

const Channels = ({ channels, currentChannelId, switchChannel: toggleChannel }) => {
  const currentChannel = channels.find(({ id }) => id === currentChannelId);
  const [action, setAction] = useState('');
  const handleClose = () => setAction('');
  return (
    <Col className="d-flex flex-column h-100">
      <Header
        currentChannel={currentChannel}
        setAction={setAction}
      />
      <ListGroup className="overflow-auto">
        {channels.map(getRenderChannel(currentChannelId, toggleChannel))}
      </ListGroup>
      <ChannelModal handleClose={handleClose} actionName={action} />
    </Col>
  );
};

const mapStateToProps = ({ channels, currentChannelId }) => ({ channels, currentChannelId });

const mapDispatchToProps = { switchChannel };

export default connect(mapStateToProps, mapDispatchToProps)(Channels);
