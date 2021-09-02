import axios from 'axios';
import { InitPage } from 'components/InitPage/initPage';
import { useReducer } from 'react';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { reducer } from 'store/reducer';
import { appStore } from 'store/store';
import { BASE_URL } from 'utils/apiConfig';

interface HomePageProps {
  message: string;
  rooms: Array<{name: string; value: string}>
}

// function useSocket(url) {
//   const [ socket, setSocket ] = useState(null);

//   useEffect(() => {
//     const socketIo = io(url, {
//       withCredentials: true,
//       extraHeaders: {
//         'my-custom-header': 'abcd',
//       },
//     });

//     setSocket(socketIo);

//     function cleanup() {
//       socketIo.disconnect();
//     }
//     return cleanup;

//     // should only run once and not on every re-render,
//     // so pass an empty array
//   }, []);

//   return socket;
// }

const HomePage = ({ message, rooms }: HomePageProps) => {
  const [ socket, setSocket ] = useState<Socket>();
  const [state, dispatch] = useReducer(reducer, appStore);
  console.log(rooms);
  

  const socketConnect = () => {
    const socketIo = io(BASE_URL, {
      withCredentials: true,
      extraHeaders: {
        'my-custom-header': 'abcd',
      },
    });
    dispatch({type:'SOCKET_CONNECT', payload: socket})
    setSocket(socketIo);
  };

  // useEffect(() => {
  //   socketConnect();
  // }, []);

  return (
    <div>
      <InitPage message={message} rooms={rooms} />
    </div>
  );
};

export const getServerSideProps = async () => {
  const rooms = await axios({
    method: 'GET',
    url: `${BASE_URL}/rooms`
  });

  return {
    props: {
      message: 'Poker Planning',
      rooms: rooms.data
    },
  };
};

export default HomePage;
