/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { postMessageRequest } from '../../api/http';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addNewMessage(state, { payload: message }) {
      state.push(message);
    },
    removeChannelMessages(state, { payload: channelId }) {
      return state.filter((msg) => msg.channelId !== channelId);
    },
  },
});

export const { addNewMessage, removeChannelMessages } = messagesSlice.actions;

export default messagesSlice.reducer;

export const postMessage = (message) => async (dispatch) => {
  const { data: { attributes: newMsg } } = await postMessageRequest(message);
  dispatch(addNewMessage(newMsg));
};
