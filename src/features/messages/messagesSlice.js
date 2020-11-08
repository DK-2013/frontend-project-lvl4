/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { postMessageRequest } from '../../api/http';
import { removeChannel } from '../channels/channelsSlice';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addNewMessage(state, { payload: message }) {
      state.push(message);
    },
  },
  extraReducers: {
    [removeChannel]: (state, { payload }) => state.filter(({ channelId }) => channelId !== payload),
  },
});

export const { addNewMessage } = messagesSlice.actions;

export default messagesSlice.reducer;

export const postMessage = (message) => async (dispatch) => {
  const { data: { attributes: newMsg } } = await postMessageRequest(message);
  dispatch(addNewMessage(newMsg));
};
