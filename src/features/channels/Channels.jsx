import React from 'react';
import { connect } from 'react-redux';
import { switchChannel } from './currentChannelSlice';

const getRenderChannel = (currentChannelId, toggleChannel) => ({ id, name }) => (
  <li className="nav-item" key={id}>
    <button
      type="button"
      className={`nav-link btn btn-block ${currentChannelId === id ? 'active ' : ' '}`}
      onClick={() => toggleChannel(id)}
    >
      {name}
    </button>
  </li>
);

const Channels = ({ channels, currentChannelId, switchChannel: toggleChannel }) => (
  <div className="col-3 border-right">
    <div className="d-flex mb-2">
      <span>Channels</span>
      <button type="button" className="btn btn-link p-0 ml-auto">+</button>
    </div>
    <ul className="nav flex-column nav-pills nav-fill">
      {channels.map(getRenderChannel(currentChannelId, toggleChannel))}
    </ul>
  </div>
);

const mapStateToProps = ({ channels, currentChannelId }) => ({ channels, currentChannelId });

const mapDispatchToProps = { switchChannel };

export default connect(mapStateToProps, mapDispatchToProps)(Channels);
