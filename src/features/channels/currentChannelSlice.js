import { createSlice } from '@reduxjs/toolkit';

const currentChannelSlice = createSlice({
  name: 'currentChannelId',
  initialState: 1,
  reducers: {
    switchChannel(state, { payload }) {
      return payload;
    },
  },
});

export const { switchChannel } = currentChannelSlice.actions;

export default currentChannelSlice.reducer;
