/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice';


const currentChannelSlice = createSlice({
  name: 'currentChannelId',
  initialState: 1,
  reducers: {
    switchChannel(state, { payload }) {
      return payload;
    },
  },
  extraReducers: {
    [removeChannel]: () => 1,
  },
});

export const { switchChannel } = currentChannelSlice.actions;

export const currentChannelSelector = ({
  channels,
  currentChannelId,
}) => channels.find(({ id }) => id === currentChannelId);

export default currentChannelSlice.reducer;
