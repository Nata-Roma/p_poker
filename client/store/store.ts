import { createContext } from 'react';
import { io, Socket } from 'socket.io-client';
import { BASE_URL } from 'utils/apiConfig';

const socketIo = io(BASE_URL, {
  withCredentials: true,
  extraHeaders: {
    'my-custom-header': 'abcd',
  },
});

export interface AppStore {
  socket: Socket;
  userId: string;
  roomId: string;
  userRole: string;
  dealer: boolean
}

export const appStore = {
  socket: socketIo,
  userId: '',
  roomId: '',
  userRole: 'member',
  dealer: false
};

const AppContext = createContext(null);

export default AppContext;
