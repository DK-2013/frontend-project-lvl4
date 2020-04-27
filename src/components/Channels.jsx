import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  console.log(state);
  return { channels: state.channels };
};

const Channels = (props) => {
  console.log(props);
  return <h1>Channels</h1>;
};

export default connect(mapStateToProps, null)(Channels);
