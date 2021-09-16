import { InitPage } from 'components/InitPage/initPage';
import { apiGetRooms } from 'services/apiServices';
import { IRoomInfo } from 'utils/interfaces';

interface HomePageProps {
  rooms: Array<IRoomInfo>
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
  return (
    <div>
      <InitPage rooms={rooms} />
    </div>
  );
};

export const getServerSideProps = async () => {
  try {
    const res = await apiGetRooms();
    if( res.status === 200) {
      return {
        props: {
          rooms: res.data
        }
      }
    }
  } catch {
      return {
        props: {
          rooms: []
        }
      }
    }
};

export default HomePage;
