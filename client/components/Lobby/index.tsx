import { Grid } from '@material-ui/core';
import useStylesLobby from '@styles/lobby.style';
import { Chat } from 'components/Chat/chat';
import { LobbyPart } from './lobbyPart';

export interface IUser {
  username: string;
  avatar: string;
}

const Lobby = () => {
  const classes = useStylesLobby();

  return (
    <div className={classes.container}>
      <Grid container style={{height: '100%'}}>
        <Grid container direction="column" item xs={12} md={9} sm={7}  className={classes.lobbyPartContainer}>
          <LobbyPart />
        </Grid>
        <Grid item xs={12} md={3} sm={5} className={classes.chatPartContainer}>
          <Chat />
        </Grid>
      </Grid>
    </div>
  );
};

export default Lobby;
