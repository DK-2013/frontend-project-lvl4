import React from 'react';
import Channels from '../features/channels/Channels';
import MessagesBox from '../features/messages/MessagesBox';

const App = () => (
  <div className="row h-100 pb-3">
    <Channels />
    <MessagesBox />
  </div>
);

export default App;
