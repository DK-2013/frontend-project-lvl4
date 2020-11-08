import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cookies from 'js-cookie';
import { Col, ListGroup } from 'react-bootstrap';
import Header from './Header';
import ChannelModal from './ChannelModal';
import { switchChannel } from './currentChannelSlice';

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

const Channels = () => {
  const { channels, currentChannelId } = useSelector((state) => state);
  const dispatch = useDispatch();
  const toggleChannel = useCallback((id) => dispatch(switchChannel(id)), [dispatch]);
  const [action, setAction] = useState(null);
  const handleClose = () => setAction(null);
  return (
    <Col className="d-flex flex-column h-100">
      <Header
        setAction={setAction}
      />
      <ListGroup className="overflow-auto">
        {channels.map(getRenderChannel(currentChannelId, toggleChannel))}
      </ListGroup>
      {action && <ChannelModal handleClose={handleClose} actionName={action} />}
    </Col>
  );
};

export default Channels;
