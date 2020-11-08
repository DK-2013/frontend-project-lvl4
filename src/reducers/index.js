import { combineReducers } from 'redux';
import channelsReducer from '../features/channels/channelsSlice';
import currentChannelReducer from '../features/channels/currentChannelSlice';
import messagesReducer from '../features/messages/messagesSlice';

export default combineReducers({
  channels: channelsReducer,
  currentChannelId: currentChannelReducer,
  messages: messagesReducer,
});
