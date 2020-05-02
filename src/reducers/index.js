import { combineReducers } from 'redux';
import currentChannelReducer from '../features/channels/currentChannelSlice';
import messagesReducer from '../features/messages/messagesSlice';

export default combineReducers({
  channels: (state = []) => state,
  currentChannelId: currentChannelReducer,
  messages: messagesReducer,
  userName: (state = '') => state,
});
