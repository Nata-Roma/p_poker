import axios from 'axios';
import { BASE_URL } from 'utils/apiConfig';
import {
  IApiGetLobbyInfo,
  IApiStartGame,
  IGameSettings,
  IRoomInfo,
} from 'utils/interfaces';

export const apiGetLobbyUsers = async (room: string | Array<string>) => {
  if (typeof room === 'string') {
    const users = await axios({
      method: 'GET',
      url: `${BASE_URL}/users/${room}`,
    });
    return users;
  }
  return null;
};

export const apiGetLobbyChats = async (room: string | Array<string>) => {
  if (typeof room === 'string') {
    const chat = await axios({
      method: 'GET',
      url: `${BASE_URL}/chats/${room}`,
    });
    return chat;
  }
  return null;
};

export const apiGetRooms = async () => {
  const rooms = await axios({
    method: 'GET',
    url: `${BASE_URL}/rooms`,
  });
  return rooms;
};

export const apiStartGame = async (room: string | Array<string>) => {
  if (typeof room === 'string') {
    const gameInitData = await axios({
      method: 'GET',
      url: `${BASE_URL}/gamestart/${room}`,
    });
    return gameInitData;
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

export const apiCreateRoom = async (config: {data: IRoomInfo}): Promise<string> => {
  const createRoom = await axios({
    method: 'POST',
    url: `${BASE_URL}/rooms`,
    data: config,
  });
  return createRoom.data;
};
