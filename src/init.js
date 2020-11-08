// @ts-check
import i18next from 'i18next';
import { configureStore } from '@reduxjs/toolkit';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';
import gon from 'gon';
import faker from 'faker';
import cookies from 'js-cookie';
import io from 'socket.io-client';

import resources from './locales';
import rootReducer from './reducers';
import { addNewMessage } from './features/messages/messagesSlice';
import {
  addChannel, renameChannel, removeChannel,
} from './features/channels/channelsSlice';
import renderApp from './application';

const setUserNameIfEmpty = () => {
  const needUserName = cookies.get('userName') === undefined;
  if (needUserName) cookies.set('userName', faker.name.findName());
  return cookies.get('userName');
};

const buildStore = () => {
  const currentChannelId = Number(cookies.get('currentChannelId')) || gon.currentChannelId;
  const channels = [...gon.channels];
  const messages = [...gon.messages];
  return configureStore({
    reducer: rootReducer,
    preloadedState: {
      channels,
      currentChannelId,
      messages,
    },
  });
};

const initSockets = ({ dispatch }) => {
  const socket = io();
  const socketHandlers = {
    newMessage: ({ data }) => {
      const { attributes: message } = data;
      if (setUserNameIfEmpty() === message.userName) return;
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
      console.log(id);
      dispatch(removeChannel(id));
    },
  };

  Object.entries(socketHandlers).forEach(([type, handler]) => {
    socket.on(type, handler);
  });
};

export default async () => {
  if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'chat:*';
    console.log('gon', gon);
  }
  await i18next.init({
    lng: 'en',
    resources,
  });
  const store = buildStore();
  initSockets(store);
  renderApp(store, document.getElementById('chat'));
};
