// @ts-check
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';
import cookies from 'js-cookie';

import { ContextProvider } from './context';
import App from './components/App';

const getUserName = () => cookies.get('userName');


export default (store, mountNode) => {
  render(
    <Provider store={store}>
      <ContextProvider value={{ userName: getUserName() }}>
        <App />
      </ContextProvider>
    </Provider>,
    mountNode,
  );
};
