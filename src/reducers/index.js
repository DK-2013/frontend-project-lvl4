import { combineReducers } from 'redux';
import currentChannelReducer from '../features/channels/currentChannelSlice';
import channelsReducer from '../features/channels/channelsSlice';
import messagesReducer from '../features/messages/messagesSlice';

export default combineReducers({
  channels: channelsReducer,
  currentChannelId: currentChannelReducer,
  messages: messagesReducer,
});
