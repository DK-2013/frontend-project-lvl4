/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import postMessageRequest from '../../api/http';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    items: [],
    current: '',
    error: null,
  },
  reducers: {
    addNewMessage(state, { payload }) {
      state.items.push(payload);
      state.current = '';
      state.error = null;
    },
    setCurrentMessage(state, { payload: text }) {
      state.current = text;
    },
    postMessageFailed(state, { payload: errorMsg }) {
      state.error = errorMsg;
    },
  },
});

export const { addNewMessage, setCurrentMessage, postMessageFailed } = messagesSlice.actions;

export default messagesSlice.reducer;

export const postMessage = ({
  channelId, userName, text,
}) => async (dispatch) => {
  try {
    await postMessageRequest({ channelId, userName, text });
  } catch (e) {
    dispatch(postMessageFailed('App is trying to connect, so messages can’t be sent yet.'));
  }
};
