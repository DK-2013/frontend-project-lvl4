/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addNewMessage(state, { payload }) {
      state.push(payload);
    },
  },
});

export const { addNewMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
