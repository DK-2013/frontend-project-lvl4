/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { postMessageRequest } from '../../api/http';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {},
  reducers: {
    addNewMessage({ byId, ids }, { payload: message }) {
      byId[message.id] = message;
      ids.push(message.id);
    },
    removeChannelMessages(state, { payload: channelId }) {
      const ids = state.ids.filter((msgId) => state.byId[msgId].channelId !== channelId);
      const byId = ids.reduce((acc, msgId) => ({ ...acc, [msgId]: state.byId[msgId] }), {});
      return { byId, ids };
    },
  },
});

export const { addNewMessage, removeChannelMessages } = messagesSlice.actions;

export default messagesSlice.reducer;

export const postMessage = (message) => async (dispatch) => {
  const { data: { attributes: newMsg } } = await postMessageRequest(message);
  dispatch(addNewMessage(newMsg));
};
