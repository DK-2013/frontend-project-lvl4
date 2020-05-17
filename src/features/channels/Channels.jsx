import React, { useState } from 'react';
import { connect } from 'react-redux';
import cookies from 'js-cookie';
import { ListGroup } from 'react-bootstrap';
import { switchChannel } from './currentChannelSlice';
import Header from './Header';
import channelActions from './ChannelActions';

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
  const Modal = channelActions[action] || null;
  return (
    <>
      <Header
        currentChannel={currentChannel}
        setAction={setAction}
      />
      <ListGroup>
        {channels.map(getRenderChannel(currentChannelId, toggleChannel))}
      </ListGroup>
      {Modal && <Modal handleClose={handleClose} currentChannel={currentChannel} />}
    </>
  );
};

const mapStateToProps = ({ channels, currentChannelId }) => ({ channels, currentChannelId });

const mapDispatchToProps = { switchChannel };

export default connect(mapStateToProps, mapDispatchToProps)(Channels);
