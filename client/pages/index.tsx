import axios from 'axios';
import { InitPage } from 'components/InitPage/initPage';
import { apiGetRooms } from 'services/apiServices';
import { BASE_URL } from 'utils/apiConfig';

interface HomePageProps {
  rooms: Array<string>
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

const HomePage = ({ rooms }: HomePageProps) => {
  console.log(rooms);
  
  return (
    <div>
      <InitPage rooms={rooms} />
    </div>
  );
};

export const getServerSideProps = async () => {
  const rooms = await apiGetRooms()

  return {
    props: {
      rooms: rooms
    },
  };
};

export default HomePage;
