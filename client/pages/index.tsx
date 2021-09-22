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

  const fake = {
    "id": 1,
    "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    "price": 109.95,
    "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    "rating": {
      "rate": 3.9,
      "count": 120
    }
  }


  try {

    const prod = await fetch('https://fakestoreapi.com/products');
    let products = await prod.json();

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
    }
  } catch {
    return {
      props: {
        rooms: [],
        response: 'no rooms',
        prod: fake
      }
    }
  }
};

export default HomePage;
