import { InitPage } from 'components/InitPage/initPage';
import { apiGetRooms } from 'services/apiServices';
import { IRoomInfo } from 'utils/interfaces';

interface HomePageProps {
  rooms: Array<IRoomInfo>,
  response: Array<IRoomInfo> | string
}

const HomePage = (props: HomePageProps) => {
  const {rooms, response} = props;
  console.log('rooms', rooms);
  console.log('response', response);
  
  
  return (
    <div>
      <InitPage rooms={rooms} />
    </div>
  );
};

export const getServerSideProps = async () => {
  try {

    const fRes = await fetch('http://localhost:4000/rooms');
    console.log('fRes', fRes);

    const fResData = await fRes.json()
    console.log('fResData', fResData);

    const res = await apiGetRooms();
    const data = await res.data;

    if (res.status === 200) {
      if (typeof data === 'string') {
        return {
          props: {
            rooms: [],
            response: fResData
          }
        }
      }
      return {
        props: {
          rooms: fResData,
          response: fResData
        }
      }
    }
  } catch {
    return {
      props: {
        rooms: [],
        response: 'no rooms'
      }
    }
  }
};

export default HomePage;
