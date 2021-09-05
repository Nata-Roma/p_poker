import Lobby from 'components/Lobby/lobby';
import { FC } from 'react';
import { apiGetLobbyInfo } from 'services/apiServices';
import { IApiGetLobbyInfo } from 'utils/interfaces';

interface LobbyPageProps {
  lobbyInfo: IApiGetLobbyInfo
}

const LobbyPage: FC<LobbyPageProps> = ({lobbyInfo}) => {

  return (
    <Lobby lobbyInfo={lobbyInfo} />
  );
};



export const getServerSideProps = async (context) => {
  const { lobby } = context.params

  const lobbyInfo = await apiGetLobbyInfo(lobby)

  return {
    props: {
      lobbyInfo
    },
  };
};


export default LobbyPage;
