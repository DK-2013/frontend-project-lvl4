import axios from 'axios';
import routes from '../routes';

const { channelPath } = routes;

export const postMessageRequest = async ({ channelId, text, userName }) => {
  const url = [channelPath(channelId), 'messages'].join('/');
  const data = {
    type: 'messages',
    attributes: { text, userName },
  };
  const { data: dt } = await axios.post(url, { data });
  return dt;
};
