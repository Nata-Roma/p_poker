import Link from 'next/link';
import { Button } from '@material-ui/core';
import { Typography, Grid } from '@material-ui/core';
import useStylesGame from '@styles/game.style';
import { Chat } from 'components/Chat/chat';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { apiCreateGame, apiGetLobbyInfo } from 'services/apiServices';
import AppContext from 'store/store';
import { IChatMessage, IUser } from 'utils/interfaces';
import { GameDealer } from './gameDealer';
import { ScoreList } from './ScoreList';
import IssuesCards from './issuesCards';
import { GameCard } from './gameCard';

export const GamePage = () => {
  const classes = useStylesGame();
  const [ users, setUsers ] = useState<Array<IUser>>();
  const { state } = useContext(AppContext);
  const router = useRouter();
  const { lobby } = router.query;
  console.log('state', state);
  console.log('router', router);
  const issues = [ 1, 2, 3, 4, 5, 6 ];
  const springNum = 123;

  const initData = async () => {
    // const data = await apiCreateGame(router.query.lobby);
    // const data = await apiGetLobbyInfo(router.query.lobby);
    const data = await apiGetLobbyInfo(lobby);

    if (data.users) {
      setUsers(data.users);
      console.log('we have users!', data.users);
    }
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <div className={classes.container}>
      <Grid container style={{ height: '100%', overflow: 'hidden' }}>
        <Grid
          container
          direction="column"
          item
          xl={9}
          md={8}
          sm={7}
          xs={12}
          className={classes.gamePartContainer}
        >
          <Grid>
            <div>Game Page</div>
            <Typography variant="h6" align="center" gutterBottom>
              Spring: {springNum} planning (issues: {issues.toString()})
            </Typography>
          </Grid>
          {users && <GameDealer users={users} issues={issues} />}
        </Grid>
        <Grid
          item
          xl={3}
          md={4}
          sm={5}
          xs={4}
          className={classes.scorePartContainer}
        >
          {users && <ScoreList users={users} />}
        </Grid>
      </Grid>
    </div>
  );
};
