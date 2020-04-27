import React from 'react';
import Channels from './Channels';
import MessagesBox from './MessagesBox';

const App = () => (
  <div className="row h-100 pb-3">
    <Channels />
    <MessagesBox />
  </div>
);

export default App;
