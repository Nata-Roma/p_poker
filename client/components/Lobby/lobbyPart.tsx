import { useRouter } from 'next/router';
import Link from 'next/link';
import { FC, useContext, useEffect, useState } from 'react';
import { Button, Typography, Grid } from '@material-ui/core';

import useStylesLobbyPart from '@styles/lobbyPart.style';
import { MemberList } from 'components/Lobby/memberList';
import { UserCard } from 'components/userCard';
import AppContext, { appStore } from 'store/store';
import { IRoomData, IUser } from 'utils/interfaces';
import { ObserverList } from './observerList';
import { roles } from 'utils/configs';

interface LobbyPartProps {
  users: Array<IUser>;
}

export const LobbyPart: FC<LobbyPartProps> = ({ users }) => {
  const classes = useStylesLobbyPart();
  const { state } = useContext(AppContext);
  const router = useRouter();
  const { lobby } = router.query;
  const [ dealer, setDealer ] = useState<IUser>();
  const [userArr, setUserArr] = useState<Array<IUser>>(users)

  const onRoomLeave = () => {
    state.socket.emit('leaveRoom', {
      roomId: lobby,
      userId: state.userId,
    });
    router.push('/');
  };

  state.socket.on('userJoined', (message) => {
    setUserArr(message.users);
    console.log(message.users);
  });



  useEffect(() => {
    const dealer = userArr.find((user) => user.dealer);
    setDealer(dealer);
  }, []);

  return (
    <>
      <Grid item>
        <Typography variant="h4" align="center" gutterBottom>
          Lobby Title
        </Typography>
      </Grid>
      <Grid item className={classes.mBottom}>
        <Typography variant="subtitle2">Dealer:</Typography>
        {dealer && (
          <UserCard
            user={dealer}
            observer={dealer.userRole === roles.observer ? true : false}
          />
        )}
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
        <Button
          variant="outlined"
          className={classes.btn}
          onClick={onRoomLeave}
        >
          Exit
        </Button>
      </Grid>
      <Grid item container>
        <MemberList users={userArr} />
      </Grid>
      <Grid item container>
        <ObserverList users={userArr} />
      </Grid>
    </>
  );
};
