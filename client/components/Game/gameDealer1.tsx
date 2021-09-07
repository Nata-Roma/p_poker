import { useRouter } from 'next/router';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Button, Typography, Grid, Box } from '@material-ui/core';

import useStylesGamePart from '@styles/gamePart.style';

import { UserCard } from 'Cards/userCard';

import AppContext from 'store/store';
import { IGameIssue, IUser } from 'utils/interfaces';
import { ObserverList } from '../Lobby/observerList';
import { roles } from 'utils/configs';
import { IssueCards } from './issueCards';

interface LobbyPartProps {
  users: Array<IUser>;
  gameIssues: Array<IGameIssue>;
}

export const GameDealer1: FC<LobbyPartProps> = ({ users, gameIssues }) => {
  const classes = useStylesGamePart();
  const { state } = useContext(AppContext);
  const router = useRouter();
  const { lobby } = router.query;
  const [ dealer, setDealer ] = useState<IUser>();
  const [ userArr, setUserArr ] = useState<Array<IUser>>(users);
  const [ issues, setIssues ] = useState<Array<IGameIssue>>();

const onAddIssue = () => {
  console.log('ADD issue');
  
}

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

  useEffect(
    () => {
      setIssues(gameIssues);
    },
    [ gameIssues ],
  );

  return (
    <>
      <Typography variant="subtitle2">Dealer:</Typography>
      <Grid container direction="column">
        <Grid container justifyContent="space-between" alignItems="flex-end">
          <Grid item className={classes.mBottom}>
            {dealer && (
              <UserCard
                user={dealer}
                observer={dealer.userRole === roles.observer ? true : false}
              />
            )}
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
            {/* {issues && <IssueCards issues={issues} />} */}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
