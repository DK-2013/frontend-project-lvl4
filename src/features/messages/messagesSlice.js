/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { postMessageRequest } from '../../api/http';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    items: [],
    current: '',
    error: null,
  },
  reducers: {
    setCurrentMessage(state, { payload: text }) {
      state.current = text;
    },
    postMessageSuccess(state, { payload }) {
      state.items.push(payload);
      state.current = '';
      state.error = null;
    },
    postMessageFailed(state, { payload: errorMsg }) {
      state.error = errorMsg;
    },
  },
});

export const { setCurrentMessage, postMessageSuccess, postMessageFailed } = messagesSlice.actions;

export default messagesSlice.reducer;

export const postMessage = ({
  channelId, userName, text,
}) => async (dispatch) => {
  try {
    const { data } = await postMessageRequest({ channelId, userName, text });
    const { attributes: message } = data;
    dispatch(postMessageSuccess(message));
  } catch (e) {
    dispatch(postMessageFailed('App is trying to connect, so messages can’t be sent yet.'));
  }
};
