import axios from 'axios';
import { BASE_URL } from 'utils/apiConfig';

export const apiGetLobbyInfo = async (room: string | Array<string>) => {
  if (typeof room === 'string') {
    const chat = await axios({
      method: 'GET',
      url: `${BASE_URL}/chats/${room}`,
    });
    const users = await axios({
      method: 'GET',
      url: `${BASE_URL}/users/${room}`,
    });

    console.log('chat', chat, 'users', users);

    return { chat: chat.data, users: users.data };
  }
  return null;
};

export const apiGetRooms = async () => {
  const rooms = await axios({
    method: 'GET',
    url: `${BASE_URL}/rooms`,
  });
  return rooms.data;
};
