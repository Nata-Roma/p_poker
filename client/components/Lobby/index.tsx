import { Grid } from '@material-ui/core';
import useStylesChat from '@styles/chat.style';
import { Chat } from 'components/Chat/chat';
import { LobbyPart } from './lobbyPart';

const Lobby = () => {
  const classes = useStylesChat();

  return (
    <>
      <Grid container>
        <Grid container direction="column" item xs={12} md={9} sm={6}>
          <LobbyPart />
        </Grid>
        <Grid item xs={12} md={3} sm={6}>
          <div className={classes.container}><Chat /></div>
        </Grid>
      </Grid>
    </>
  );
};

export default Lobby;
