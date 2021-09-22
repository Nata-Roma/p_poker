import { InitPage } from 'components/InitPage/initPage';
import { apiGetRooms } from 'services/apiServices';
import { IRoomInfo } from 'utils/interfaces';

interface HomePageProps {
  rooms: Array<IRoomInfo>
}

const HomePage = ({ rooms }: HomePageProps) => {
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
            rooms: []
          }
        }
      }
      return {
        props: {
          rooms: fResData
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
