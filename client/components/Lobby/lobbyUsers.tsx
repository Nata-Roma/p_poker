import { useRouter } from 'next/router';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Button, Typography, Grid } from '@material-ui/core';

import useStylesLobbyPart from '@styles/lobbyPart.style';
import { MemberList } from 'components/Lobby/memberList';
import { UserCard } from 'Cards/userCard';
import AppContext from 'store/store';
import { IUser, LobbyPartProps } from 'utils/interfaces';
import { ObserverList } from './observerList';
import { roles } from 'utils/configs';

export const LobbyUser: FC<LobbyPartProps> = ({ users, onRemove }) => {
  const classes = useStylesLobbyPart();
  const { state } = useContext(AppContext);
  const router = useRouter();
  const { lobby } = router.query;
  const [ dealer, setDealer ] = useState<IUser>();
  const [ userArr, setUserArr ] = useState<Array<IUser>>(users);

  const onRoomLeave = () => {
    state.socket.emit('leaveRoom', {
      roomId: lobby,
      userId: state.userId,
    });
    router.push('/');
  };

  // state.socket.on('userJoined', (message) => {
  //   setUserArr(message);
  //   console.log('Lobby Users join user', message);
  // });

  // state.socket.on('userLeft', (message) => {
  //   setUserArr(message);
  //   console.log('Lobby user left', message);
  // });

  const gameStart = () => {
    router.push(`/${lobby}/game`);
    console.log('Go to Game Page');
  };

  const gameFinish = (message: string) => {
    console.log('gameOver', message);
    state.socket.emit('gameOverFinish', { roomId: lobby });
    router.push('/');
  };

  useEffect(
    () => {
      const dealer = userArr.find((user) => user.dealer);
      setDealer(dealer);
    },
    [ userArr ],
  );

  useEffect(() => {
    state.socket.on('gameOver', (message) => {
      gameFinish(message);
    });
    state.socket.on('gameStarted', (message) => {
      gameStart();
    });

    return () => {
      state.socket.off('gameOver', (message) => {
        gameFinish(message);
      });
      state.socket.off('gameStarted', (message) => {
        gameStart();
      });
    };
  });

  const onRemoveUser = (user: IUser) => {
    onRemove(user);
    console.log(user);
  };

  return (
    <Grid
      container
      direction="column"
      item
      xs={12}
      md={9}
      sm={7}
      className={classes.lobbyPartUserContainer}
      wrap="nowrap"
    >
      <Grid item>
        <Typography variant="h4" align="center" gutterBottom>
          Lobby
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
        {users && <MemberList users={users} onRemoveUser={onRemoveUser} />}
      </Grid>
      <Grid item container>
        {users && (
          <ObserverList users={users} onRemoveUser={onRemoveUser} />
        )}
      </Grid>
    </Grid>
  );
};
