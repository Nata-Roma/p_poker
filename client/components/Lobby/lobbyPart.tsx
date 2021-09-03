import { useRouter } from 'next/router'
import Link from 'next/link';
import { FC, useContext, useEffect, useState } from 'react';
import { Button, Typography, Grid } from '@material-ui/core';

import useStylesLobbyPart from '@styles/lobbyPart.style';
import { MemberList } from 'components/Lobby/memberList';
import { UserCard } from 'components/userCard';
import AppContext, { appStore } from 'store/store';
import { IRoomData, IUser } from 'utils/interfaces';
import { ObserverList } from './observerList';



const roles = new Map([ [ 'dealer', 'dealer' ], [ 'member', 'member' ] ]);

interface LobbyPartProps {
  users: IRoomData;
}

export const LobbyPart:FC<LobbyPartProps> = ({users}) => {
  const classes = useStylesLobbyPart();
  const {state} = useContext(AppContext);
  const router = useRouter();
  const { lobby } = router.query;
  const [dealer, setDealer] = useState<IUser>();

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
  
useEffect(() => {
  const dealer = users.users.find(user => user.dealer)
  setDealer(dealer)
}, [])

  return (
    <>
      <Grid item>
        <Typography variant="h4" align="center" gutterBottom>
          Lobby Title
        </Typography>
      </Grid>
      <Grid item className={classes.mBottom}>
        <Typography variant="subtitle2">Dealer:</Typography>
        {dealer && <UserCard user={dealer} />}
      </Grid>
      {state.dealer && (
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
        <MemberList users={users} />
      </Grid>
      <Grid item container>
        <ObserverList users={users} />
      </Grid>
    </>
  );
};
