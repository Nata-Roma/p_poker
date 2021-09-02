import { useRouter } from 'next/router'
import Link from 'next/link';
import { useContext } from 'react';
import { Button, Typography, Grid } from '@material-ui/core';

import useStylesLobbyPart from '@styles/lobbyPart.style';
import { MemberList } from 'components/Lobby/memberList';
import { UserCard } from 'components/userCard';
import AppContext, { appStore } from 'store/store';



const roles = new Map([ [ 'dealer', 'dealer' ], [ 'member', 'member' ] ]);

export const LobbyPart = () => {
  const role = 'dealer';
  const classes = useStylesLobbyPart();
  const {state} = useContext(AppContext);
  const router = useRouter();
  const { lobby } = router.query;

  const onRoomLeave = () => {
    state.socket.emit('leaveRoom', {
      roomId: lobby,
      userId: state.userId
    });
    router.push('/')
  }

  state.socket.on('userJoined', (message) => {
    console.log(message);
  })
  
  return (
    <>
      <Grid item>
        <Typography variant="h4" align="center" gutterBottom>
          Lobby Title
        </Typography>
      </Grid>
      <Grid item className={classes.mBottom}>
        <Typography variant="subtitle2">Dealer:</Typography>
        <UserCard user={{ username: 'Koza Nostra', avatar: '' }} />
      </Grid>
      {role === roles.get('dealer') && (
        <Grid item className={classes.mBottom}>
          <Link href="/lobby/game">
            <Button color="primary" variant="contained">
              Start Game
            </Button>
          </Link>
        </Grid>
      )}

      <Grid
        item
        container
        justifyContent="flex-end"
        className={classes.mBottom}
      >
          <Button variant="outlined" className={classes.btn} onClick={onRoomLeave}>
            Exit
          </Button>
      </Grid>
      <Grid item container>
        <MemberList />
      </Grid>
    </>
  );
};
