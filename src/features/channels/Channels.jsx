import React, { useState } from 'react';
import { connect } from 'react-redux';
import cookies from 'js-cookie';
import { Col, ListGroup } from 'react-bootstrap';
import Header from './Header';
import ChannelModal from './ChannelModal';
import { switchChannel } from './channelsSlice';

const renderChannel = ({ id, name }, currentChannelId, toggleChannel) => {
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

const Channels = ({
  switchChannel: toggleChannel,
  channels: { byId, ids, currentChannelId },
}) => {
  const currentChannel = byId[currentChannelId];
  const [action, setAction] = useState('');
  const handleClose = () => setAction('');
  return (
    <Col className="d-flex flex-column h-100">
      <Header
        currentChannel={currentChannel}
        setAction={setAction}
      />
      <ListGroup className="overflow-auto">
        {ids.map((id) => renderChannel(byId[id], currentChannelId, toggleChannel))}
      </ListGroup>
      <ChannelModal handleClose={handleClose} actionName={action} />
    </Col>
  );
};

const mapStateToProps = ({ channels }) => ({
  channels,
});

const mapDispatchToProps = { switchChannel };

export default connect(mapStateToProps, mapDispatchToProps)(Channels);
