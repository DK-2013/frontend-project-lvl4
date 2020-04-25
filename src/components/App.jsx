import React from 'react';
import Channels from './Channels';
import MessagesBox from './MessagesBox';

const App = ({ channels }) => (
  <div className="row h-100 pb-3">
    <Channels channels={channels} />
    <MessagesBox />
  </div>
);

export default App;
