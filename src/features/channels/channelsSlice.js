import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    addChannel(state, { payload: { id, name } }) {
      state.push({ id, name, removable: true });
    },
    removeChannel(state, { payload: { id } }) {
      return state.filter((channel) => channel.id !== id);
    },
    renameChannel(state, { payload: { id, name } }) {
      const channel = state.find((ch) => ch.id === id);
      channel.name = name;
    },
  },
});

export const { addChannel, renameChannel, removeChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
