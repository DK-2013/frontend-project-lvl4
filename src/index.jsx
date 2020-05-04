// @ts-check
import React from 'react';
import { render } from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';
import gon from 'gon';
import faker from 'faker';
import cookies from 'js-cookie';
// import io from 'socket.io-client';

import App from './components/App';
import rootReducer from './reducers';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
  console.log('gon', gon);
}

const getUserName = () => {
  const needUserName = cookies.get('userName') === undefined;
  if (needUserName) cookies.set('userName', faker.name.findName());
  return cookies.get('userName');
};

const run = () => {
  const userName = getUserName();
  const { channels, messages, currentChannelId } = gon;
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
      channels,
      currentChannelId,
      messages: {
        items: messages,
        current: '',
        error: '',
      },
      userName,
    },
  });

  const mountNode = document.getElementById('chat');
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    mountNode,
  );
};

run();
