import { InitPage } from 'components/InitPage/initPage';
import { apiGetRooms } from 'services/apiServices';
import { IRoomInfo } from 'utils/interfaces';

interface HomePageProps {
  rooms: Array<IRoomInfo>,
  response: Array<IRoomInfo> | string
  prod: any
}

const HomePage = (props: HomePageProps) => {
  const {rooms, response, prod} = props;
  console.log('rooms', rooms);
  console.log('response', response);
  console.log('prod');
  console.log(prod);
  
  
  
  return (
    <div>
      <InitPage rooms={rooms} />
    </div>
  );
};

export const getServerSideProps = async () => {

  const prod = await fetch('https://fakestoreapi.com/products');
  let products = await prod.json();

  // try {

    

    const fRes = await fetch('http://localhost:4000/rooms');
    console.log('fRes', fRes);

    const fResData = await fRes.json()
    console.log('fResData', fResData);

    // const res = await apiGetRooms();
    // const data = await res.data;
    return {
      props: {
        rooms: [],
        response: 'try',
        prod: products[0]
      }
    }

    
    if (fRes.status === 200) {
      if (typeof fResData === 'string') {
        return {
          props: {
            rooms: [],
            response: fResData,
            prod: products[0]
          }
        }
      }
      return {
        props: {
          rooms: fResData,
          response: fResData,
          prod: products[0]
        }
      }
    } else {

  // } catch {
    return {
      props: {
        rooms: [],
        response: fResData,
        prod: products[0]
      }
    }
  }
};

export default HomePage;
