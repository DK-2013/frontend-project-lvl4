import axios from 'axios';
import routes from '../routes';

const { channelsPath, channelPath, channelMessagesPath } = routes;

export const postMessageRequest = async ({ channelId, text, userName }) => {
  const url = channelMessagesPath(channelId);
  const data = {
    type: 'messages',
    attributes: { text, userName },
  };
  const { data: dt } = await axios.post(url, { data });
  return dt;
};

export const addChannelRequest = async ({ name }) => {
  const url = channelsPath();
  const data = {
    type: 'channels',
    attributes: { name },
  };
  const { data: dt } = await axios.post(url, { data });
  return dt;
};

export const renameChannelRequest = async ({ id, name }) => {
  const url = channelPath(id);
  const data = {
    type: 'channels',
    attributes: { name },
  };
  const { data: dt } = await axios.patch(url, { data });
  return dt;
};

export const removeChannelRequest = async ({ id }) => {
  const url = channelPath(id);
  const { data: dt } = await axios.delete(url);
  return dt;
};
