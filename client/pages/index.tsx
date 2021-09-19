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
