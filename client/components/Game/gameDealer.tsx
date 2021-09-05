import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Button, Typography, Grid, Box } from '@material-ui/core';

import useStylesGamePart from '@styles/gamePart.style';

import { UserCard } from 'components/userCard';

import AppContext, { appStore } from 'store/store';
import { IRoomData, IUser } from 'utils/interfaces';
import { ObserverList } from '../Lobby/observerList';
import { roles } from 'utils/configs';
import IssuesCards from './issuesCards';

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
    },
    [ userArr ],
  );

  return (
    <>      
        <Typography variant="subtitle2">Dealer:</Typography>
        <Grid  container justifyContent="space-between" alignItems="flex-end" >
        <Grid item className={classes.mBottom}>
        {state.dealer && (
            
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
             <Grid item className={classes.mBottom} >
             <Box  boxShadow={2} mr={10}>
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
      
     
    </>
  );
};
