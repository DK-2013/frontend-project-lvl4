import { createSlice } from '@reduxjs/toolkit';

let nextMessageId = 0;

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessage: {
      reducer(state, action) {
        const { id, text, channelId } = action.payload;
        state.push({ id, text, channelId });
      },
      prepare(channelId, text) {
        nextMessageId += 1;
        return { payload: { text, id: nextMessageId, channelId } };
      },
    },
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
