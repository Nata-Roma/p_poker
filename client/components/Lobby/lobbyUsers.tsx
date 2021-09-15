import { useRouter } from 'next/router';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Button, Typography, Grid } from '@material-ui/core';

import useStylesLobbyPart from '@styles/lobbyPart.style';
import { MemberList } from 'components/Lobby/memberList';
import { UserCard } from 'components/Cards/userCard';
import AppContext from 'store/store';
import { IUser } from 'utils/interfaces';
import { ObserverList } from './observerList';
import { roles } from 'utils/configs';
import KickPlayerPopup from './kickPlayerPopup';


export interface LobbyUserProps {
  users: Array<IUser>;
}

export const LobbyUser: FC<LobbyUserProps> = ({ users }) => {
  const classes = useStylesLobbyPart();
  const { state } = useContext(AppContext);
  const router = useRouter();
  const { lobby } = router.query;
  const [ dealer, setDealer ] = useState<IUser>();
  const [ isOpenKickUser, setIsOpenKickUser ] = useState(false);
  const [kickOffUser, setKickOffUser] = useState<IUser>();

  const onRoomLeave = () => {
    state.socket.emit('leaveRoom', {
      roomId: lobby,
      userId: state.userId,
    });
    router.push('/');
  };

  const onDeleteUser = (user: IUser) => {

  }

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
      const dealer = users?.find((user) => user.dealer);
      setDealer(dealer);
    },
    [ users ],
  );

  useEffect(() => {
    state.socket.on('gameOver', (message) => {
      gameFinish(message);
    });
    state.socket.on('gameStarted', (message) => {
      gameStart();

     
    });
    
      
  state.socket.emit('getGameData', { 
    roomId: lobby,
    user: { 
      username: state.username,
      userSurname: state.userSurname,
      avatar: state.avatar,
      id: state.userId,
      userRole: state.userRole,
    }
  });

  state.socket.on('gameData', (message) => {
   const { gameData } = message;
   if(gameData.isStarted && gameData.isAutoJoin) {   
    gameStart();
   } if(gameData && gameData.isStarted  && !gameData.isAutoJoin) {    
     state.socket.on('lateMemberMayJoin', (message) => {     
        if( state.userId === message) {
          gameStart();
        }
     }); 
   }
  });

  state.socket.on('memberIsDeclined', (message) => {   
    if(state.userId === message) {
      onRoomLeave();
    }
 });


    return () => {
      state.socket.off('gameOver', (message) => {
        gameFinish(message);
      });
      state.socket.off('gameStarted', (message) => {
        gameStart();
      });
      state.socket.off('gameData', (message) => {
 
      });
      state.socket.off('lateMemberMayJoin', (message) => {
    
      });
      state.socket.off('memberIsDeclined', (message) => {

      });
    };
  }, []);

  const onKickUser = (user: IUser) => {
    setIsOpenKickUser(true);
    setKickOffUser(user)
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
            onKickUser={onKickUser}
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
        {users && <MemberList users={users} onKickUser={onKickUser} />}
      </Grid>
      <Grid item container>
        {users && (
          <ObserverList users={users} onKickUser={onKickUser} />
        )}
      </Grid>
      <KickPlayerPopup
        isOpenKickUser={isOpenKickUser}
        onClosePopUp={(isOpen: boolean) => setIsOpenKickUser(isOpen)}
        user={kickOffUser}
        onDeleteUser={onDeleteUser}
      />
    </Grid>
  );
};
