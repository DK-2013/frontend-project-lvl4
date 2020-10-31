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
import io from 'socket.io-client';

import { ContextProvider } from './context';
import App from './components/App';
import rootReducer from './reducers';
import { addNewMessage, removeChannelMessages } from './features/messages/messagesSlice';
import {
  switchChannel, addChannel, renameChannel, removeChannel,
} from './features/channels/channelsSlice';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
  console.log('gon', gon);
}

const getUserName = () => {
  const needUserName = cookies.get('userName') === undefined;
  if (needUserName) cookies.set('userName', faker.name.findName());
  return cookies.get('userName');
};

const socket = io();

const normalize = (list) => list.reduce(({ byId, ids }, item) => ({
  byId: { ...byId, [item.id]: item },
  ids: [...ids, item.id],
}), { byId: {}, ids: [] });

const run = () => {
  const userName = getUserName();
  const currentChannelId = Number(cookies.get('currentChannelId')) || gon.currentChannelId;
  const channels = normalize(gon.channels);
  const messages = normalize(gon.messages);
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
      channels: { ...channels, currentChannelId },
      messages,
    },
  });

  const mountNode = document.getElementById('chat');
  render(
    <Provider store={store}>
      <ContextProvider value={{ userName }}>
        <App />
      </ContextProvider>
    </Provider>,
    mountNode,
  );

  const { dispatch } = store;
  const socketHandlers = {
    newMessage: ({ data }) => {
      const { attributes: message } = data;
      if (userName === message.userName) return;
      dispatch(addNewMessage(message));
    },
    newChannel: ({ data }) => {
      const { attributes: channel } = data;
      dispatch(addChannel(channel));
    },
    renameChannel: ({ data }) => {
      const { attributes: channel } = data;
      dispatch(renameChannel(channel));
    },
    removeChannel: ({ data }) => {
      const { id } = data;
      dispatch(removeChannel({ id }));
      dispatch(removeChannelMessages(id));
      dispatch(switchChannel(1));
    },
  };

  Object.entries(socketHandlers).forEach(([type, handler]) => {
    socket.on(type, handler);
  });
};

run();
