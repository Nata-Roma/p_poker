import { GamePage } from 'components/Game/gamePage';
import { apiGetLobbyInfo, apiStartGame } from 'services/apiServices';
import { IApiStartGame, IUser } from 'utils/interfaces';

interface GameProps {
  gameData: IApiStartGame,
  userData: Array<IUser>
}

const Game = ({gameData, userData}) => {
  return <GamePage gameData={gameData} userData={userData} />;
};

export const getServerSideProps = async (context) => {
  const { lobby } = context.params

  const usersData = await apiGetLobbyInfo(lobby);
  const gameData = await apiStartGame(lobby);

  return {
    props: {
      userData: usersData.users,
      gameData
    },
  };
};

export default Game;
