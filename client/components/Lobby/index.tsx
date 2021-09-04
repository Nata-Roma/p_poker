import { Grid } from '@material-ui/core';
import useStylesLobby from '@styles/lobby.style';
import { Chat } from 'components/Chat/chat';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { apiGetLobbyInfo } from 'services/apiServices';
import AppContext from 'store/store';
import { IChat, IChatMessage, IRoomData, IUser } from 'utils/interfaces';
import { LobbyPart } from './lobbyPart';

interface LobbyProps {
  lobbyInfo: {
    chat: IChat;
    users: IRoomData;
  };
}

const Lobby = () => {
  const classes = useStylesLobby();
  const [ chatMessages, setChatMessages ] = useState<Array<IChatMessage>>();
  const [ users, setUsers ] = useState<Array<IUser>>();
  const router = useRouter();
  const { state } = useContext(AppContext);
  // console.log(lobbyInfo);

  const initData = async () => {
    const data = await apiGetLobbyInfo(router.query.lobby);
    setChatMessages(data.chat.chatMessages);
    setUsers(data.users.users);
    console.log(data);
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
          {users && users && <LobbyPart users={users} />}
        </Grid>
        <Grid item xs={12} md={3} sm={5} className={classes.chatPartContainer}>
          <Chat chatMessages={chatMessages} />
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
