import axios from 'axios';
import { BASE_URL } from 'utils/apiConfig';
import {
  IApiGetLobbyInfo,
  IChatMessage,
  IGameSettings,
  IUser,
} from 'utils/interfaces';

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

export const apiStartGame = async (room: string | Array<string>) => {
  // For now it is GET request. Will be converted to POST
  if (typeof room === 'string') {
    const gameInitData = await axios({
      method: 'GET',
      url: `${BASE_URL}/gamestart/${room}`,
    });
    return gameInitData.data;
  }
  return null;
};

export const apiCreateGame = async (
  room: string | Array<string>,
  data: IGameSettings,
) => {
  if (typeof room === 'string') {
    const users = await axios({
      method: 'POST',
      url: `${BASE_URL}/gamestart/${room}`,
      data: data,
    });
  }
};
