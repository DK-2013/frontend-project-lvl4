import React from 'react';

const renderChannel = ({ id, name }, idx) => (
  <li className="nav-item" key={id}>
    <button type="button" className={`nav-link btn btn-block ${idx ? ' ' : 'active '}`}>{name}</button>
  </li>
);

const Channels = ({ channels }) => (
  <div className="col-3 border-right">
    <div className="d-flex mb-2">
      <span>Channels</span>
      <button type="button" className="btn btn-link p-0 ml-auto">+</button>
    </div>
    <ul className="nav flex-column nav-pills nav-fill">
      {channels.map(renderChannel)}
    </ul>
  </div>
);

export default Channels;
