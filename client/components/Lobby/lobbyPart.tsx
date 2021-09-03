import { useRouter } from 'next/router'
import Link from 'next/link';
import { useContext } from 'react';
import { Button, Typography, Grid } from '@material-ui/core';

import useStylesLobbyPart from '@styles/lobbyPart.style';
import { MemberList } from 'components/Lobby/memberList';
import { UserCard } from 'components/userCard';
import NameGame from './nameGame';
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
    <Grid container spacing={2}>
      <Grid item>
        <Typography variant="h4" align="center" gutterBottom>
          Lobby Title
        </Typography>
      </Grid>
      <Grid item xs={12} justifyContent="center">
      <NameGame/>
      </Grid>
      <Grid item className={classes.mBottom}>
        <Typography variant="subtitle2">Dealer:</Typography>
        <UserCard user={{ username: 'Koza Nostra', avatar: '' }} />
      </Grid>
      <Grid
        item
        container
        justifyContent="space-between"
        className={classes.mBottom}
      >
      {role === roles.get('dealer') && (
        <Grid item >
          <Link href="/lobby/game">
            <Button color="primary" variant="contained" className={classes.btn}>
              Start Game
            </Button>
          </Link>
        </Grid>
      )}
          <Button variant="outlined" className={classes.btn} onClick={onRoomLeave}>
            Exit
          </Button>
      </Grid>
      <Grid item container>
        <MemberList />
      </Grid>
    </Grid>
  );
};
