import axios from 'axios';
import { BASE_URL } from 'utils/apiConfig';
import { IChatMessage, IUser } from 'utils/interfaces';

interface IApiGetLobbyInfo {
  chat: Array<IChatMessage>;
  users: Array<IUser>;
}

export const apiGetLobbyInfo = async (
  room: string | Array<string>,
): Promise<IApiGetLobbyInfo | null> => {
  if (typeof room === 'string') {
    const chat = await axios({
      method: 'GET',
      url: `${BASE_URL}/chats/${room}`,
    });
    const users = await axios({
      method: 'GET',
      url: `${BASE_URL}/users/${room}`,
    });
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

export const apiCreateGame = async(room: string | Array<string>) => {
// For now it is GET request. Will be converted to POST
if(typeof room === 'string') {
  const users = await axios({
    method: 'GET',
    url: `${BASE_URL}/game/${room}`,
  });
}

}