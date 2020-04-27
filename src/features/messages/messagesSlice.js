import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessage(state, action) {
      const { id, text } = action.payload;
      state.push({ id, text, completed: false });
    },
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
