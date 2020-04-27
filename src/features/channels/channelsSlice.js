import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    addChannel(state, action) {
      const { id, name } = action.payload;
      state.push({ id, name });
    },
  },
});

export const { addChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
