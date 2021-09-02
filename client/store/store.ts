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
}

export const appStore = {
  socket: socketIo,
  userId: '',
  roomId: '',
};

const AppContext = createContext(null)
//   socket: socketIo,
//   userId: '',
//   roomId: '',
// });

// export const AppContextConsumer = AppContext.Consumer;
// export const AppContextProvider = AppContext.Provider;
export default AppContext;
