/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {},
  reducers: {
    switchChannel(state, { payload }) {
      state.currentChannelId = payload;
    },
    addChannel(state, { payload: channel }) {
      state.byId[channel.id] = channel;
      state.ids.push(channel.id);
    },
    removeChannel(state, { payload: channelId }) {
      delete state.byId[channelId];
      state.ids = state.ids.filter((id) => channelId !== id);
      state.currentChannelId = 1;
    },
    renameChannel(state, { payload: { id, name } }) {
      const channel = state.byId[id];
      channel.name = name;
    },
  },
});

export const {
  switchChannel, addChannel, renameChannel, removeChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
