import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Button, Typography, Grid, Box } from '@material-ui/core';

import useStylesGamePart from '@styles/gamePart.style';

import { UserCard } from 'Cards/userCard';

import AppContext, { appStore } from 'store/store';
import { IRoomData, IUser } from 'utils/interfaces';
import { ObserverList } from '../Lobby/observerList';
import { gameCardSur, roles, fibonacci_Seq } from 'utils/configs';
import IssuesCards from './issuesCards';
import { GameCard } from '../../Cards/gameCard';

interface LobbyPartProps {
  users: Array<IUser>;
  issues?: number[];
}

export const GameDealer: FC<LobbyPartProps> = ({ users, issues }) => {
  const classes = useStylesGamePart();
  const { state } = useContext(AppContext);
  const router = useRouter();
  const { lobby } = router.query;
  const [ dealer, setDealer ] = useState<IUser>();
  const [ userArr, setUserArr ] = useState<Array<IUser>>(users);

  console.log('USers', users);

  const onRoomLeave = () => {
    state.socket.emit('leaveRoom', {
      roomId: lobby,
      userId: state.userId,
    });
    router.push('/');
  };

  state.socket.on('userLeft', (message) => {
    setUserArr(message);
    console.log('game user left', message);
  });

  useEffect(
    () => {
      const dealer = userArr.find((user) => user.dealer);
      setDealer(dealer);
      console.log('gameDealer', userArr);
    },
    [ userArr ],
  );

  return (
    <>
      <Typography variant="subtitle2">Dealer:</Typography>
      <Grid container direction='column'>
      <Grid container justifyContent="space-between" alignItems="flex-end">
        <Grid item className={classes.mBottom}>
          {dealer && (
            <UserCard
              user={dealer}
              observer={dealer.userRole === roles.observer ? true : false}
            />
          )}
          {/* made for develope*/}
          {/* <UserCard
              user={{"username":"Main","userSurname":"Dealer","avatar":"","id":"AsClmPqC3H9fyBcWAABp","userRole":"member","dealer":true}}
              observer={false}
            /> */}
        </Grid>
        <Grid item className={classes.mBottom}>
          <Box boxShadow={2} mr={10}>
            <Button
              variant="outlined"
              className={classes.btn}
              onClick={onRoomLeave}
            >
              {dealer ? `Stop Game` : `Exit`}
            </Button>
          </Box>
        </Grid>
        <Grid container className={classes.issuesContainer}>
          <IssuesCards issues={issues} />
        </Grid>
        
      </Grid>
      <Grid container>
        {gameCardSur.map((card, i) => <GameCard key={card} cardImg={card} cardNumber={fibonacci_Seq[i]} />)}
        </Grid>
        </Grid>
    </>
  );
};
