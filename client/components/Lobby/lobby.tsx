import { Grid } from '@material-ui/core';
import useStylesLobby from '@styles/lobby.style';
import { Chat } from 'components/Chat/chat';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { apiGetLobbyInfo } from 'services/apiServices';
import AppContext from 'store/store';
import { IChatMessage, IUser } from 'utils/interfaces';
import { LobbyDealer } from './lobbyDealer';
import { LobbyUser } from './lobbyUsers';

interface LobbyProps {
  lobbyInfo: {
    chat: Array<IChatMessage>;
    users: Array<IUser>;
  };
}

const Lobby = () => {
  const classes = useStylesLobby();
  const [ chatMessages, setChatMessages ] = useState<Array<IChatMessage>>();
  const [ users, setUsers ] = useState<Array<IUser>>();
  const { state } = useContext(AppContext);
  const router = useRouter();

  const initData = async () => {
    const data = await apiGetLobbyInfo(router.query.lobby);

    if (data.chat.length) {
      console.log('we have a chat!', data.chat);

      setChatMessages(data.chat);
    }
    if (data.users) {
      setUsers(data.users);
    }
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <div className={classes.container}>
      <Grid container style={{ height: '100%' }}>
        <Grid
          container
          direction="column"
          item
          xs={12}
          md={9}
          sm={7}
          className={classes.lobbyPartContainer}
        >
          {state.dealer && users && <LobbyDealer users={users} />}
          {!state.dealer && users && <LobbyUser users={users} />}
        </Grid>
        <Grid item xs={12} md={3} sm={5} className={classes.chatPartContainer}>
          {chatMessages && <Chat chatMessages={chatMessages} />}
          {!chatMessages && <Chat chatMessages={chatMessages} />}
        </Grid>
      </Grid>
    </div>
  );
};

// export const getServerSideProps = async (context) => {
//   const { lobby } = context.params;

//   const lobbyInfo = await apiGetLobbyInfo(lobby);

//   return {
//     props: {
//       lobbyInfo: lobbyInfo,
//     },
//   };
// };

export default Lobby;
