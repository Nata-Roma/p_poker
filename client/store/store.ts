import { createContext } from 'react';
import { io, Socket } from 'socket.io-client';
import { BASE_URL } from 'utils/apiConfig';

const socketIo = io(BASE_URL, {
  withCredentials: true,
  extraHeaders: {
    'my-custom-header': 'abcd',
  },
});

export const appStore = {
  socket: socketIo,
};

export const AppContext = createContext(appStore);
