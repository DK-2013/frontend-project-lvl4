/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    addChannel(state, { payload: channel }) {
      state.push(channel);
    },
    renameChannel(state, { payload: { id: channelId, name } }) {
      const channel = state.find(({ id }) => id === channelId);
      channel.name = name;
    },
    removeChannel: (state, { payload }) => state.filter(({ id }) => payload !== id),
  },
});

export const {
  addChannel, renameChannel, removeChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
