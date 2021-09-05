import Link from 'next/link';
import { Button } from '@material-ui/core';
import { Typography, Grid } from '@material-ui/core';
import useStylesGame from '@styles/game.style';
import { Chat } from 'components/Chat/chat';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { apiGetLobbyInfo } from 'services/apiServices';
import AppContext from 'store/store';
import { IChatMessage, IUser } from 'utils/interfaces';
import { GameDealer } from './gameDealer';
import { ScoreList } from './ScoreList';
import IssuesCards from './issuesCards';



export const GamePage = () => {
  const classes = useStylesGame();
    const [ users, setUsers ] = useState<Array<IUser>>();
  const { state } = useContext(AppContext);
  const router = useRouter();
  console.log('state', state);
  console.log('router', router);
  const issues = [1, 2, 3, 4, 5, 6];
  const springNum = 123;

  const initData = async () => {
    const data = await apiGetLobbyInfo('z3aRNZxzhODl9LRFLln13');
      
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
      {/* <div>Game Page</div>
      <Typography variant="h6" align="center" gutterBottom>
            Spring: {state.gameSpring} planning (issues: )
      </Typography> 
      <Link href="/">
        <Button color="primary" variant="contained">
          {/* {state.dealer ? 'Stop Game' : 'Exit '} */}
{/*          
        </Button>
      </Link> */}
       
      <Grid container style={{ height: '100%', overflow: 'hidden' }} >
        <Grid
          container
          direction="column"
          item
          xs={12}
          md={8}
          sm={7}
          className={classes.gamePartContainer}
        >
          <Grid>
          <div>Game Page</div>
           <Typography variant="h6" align="center" gutterBottom>
            Spring: {springNum} planning (issues: {issues.toString()})
          </Typography>
          </Grid>        
          {/* {state.dealer && users && <GameDealer users={users} />} */}
          { users && <GameDealer users={users} issues={issues}/>}
          {/* {!state.dealer && users && <GameUser users={users} />} */}
        </Grid>
        <Grid item xs={4} md={4} sm={5} className={classes.scorePartContainer}>
         
      {/* <Grid item container xs={4}> */}
        {/* {users && <MemberList users={users} />} */}
        {users && <ScoreList users={users} />}
       
      {/* </Grid> */}
        </Grid>
      </Grid> 
    </div>
  );
};
