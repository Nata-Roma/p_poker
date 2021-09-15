import { nanoid } from 'nanoid';
import { createContext } from 'react';
import { io, Socket } from 'socket.io-client';
import { BASE_URL } from 'utils/apiConfig';
import appStorage from 'utils/storage';

const socketIo = io(BASE_URL, {
  withCredentials: true,
  auth: {
    userId: '',
  },
  extraHeaders: {
    'my-custom-header': 'abcd',
  },
});

socketIo.on('connect', () => {});
socketIo.disconnect().connect();

export interface AppStore {
  socket: Socket;
  userId: string;
  roomId: string;
  userRole: string;
  dealer: boolean;
}

export const appStore = {
  socket: socketIo,
  userId: '',
  username: '',
  userSurname: '',
  avatar: '',
  roomId: '',
  userRole: 'member',
  dealer: false,
};

const AppContext = createContext(null);

export default AppContext;
