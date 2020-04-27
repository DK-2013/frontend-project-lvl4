// @ts-check
// import React from 'react';
import { bootstrap } from 'redux-bootstrap';
import { render } from 'react-dom';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';
import gon from 'gon';

import messages from './features/messages/messagesSlice';
import channels from './features/channels/channelsSlice';
import routes from './config/routes';

// import faker from 'faker';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
  console.log('gon: ', gon);
}
const { channels: ch, messages: ms } = gon;
bootstrap({
  container: 'chat',
  initialState: { channels: ch, messages: ms },
  reducers: {
    messages,
    channels,
  },
  routes,
});
