import { Grid } from '@material-ui/core';
import useStylesLobby from '@styles/lobby.style';
import { Chat } from 'components/Chat/chat';
import { useRouter } from 'next/router';
import { FC, useContext, useEffect, useState } from 'react';
import { apiGetLobbyInfo } from 'services/apiServices';
import {
  setDealer,
  setRoomId,
  setUserAvatar,
  setUserId,
  setUsername,
  setUserRole,
  setUserSurname,
} from 'store/actionCreators';
import AppContext from 'store/store';
import { IApiGetLobbyInfo, IChatMessage, IUser } from 'utils/interfaces';
import appStorage from 'utils/storage';
import { userCreate } from 'utils/userCreate';
import { LobbyDealer } from './lobbyDealer';
import { LobbyUser } from './lobbyUsers';
import KickPlayerPopup from './kickPlayerPopup';

interface LobbyProps {
  lobbyInfo: IApiGetLobbyInfo;
}

const Lobby: FC<LobbyProps> = ({ lobbyInfo }) => {
  const classes = useStylesLobby();
  const [ chatMessages, setChatMessages ] = useState<Array<IChatMessage>>();
  const [ users, setUsers ] = useState<Array<IUser>>();
  const [ isOpenKickUser, setIsOpenKickUser ] = useState(false);
  const [ deletedUser, setDeletedUser ] = useState<IUser | null>(null);
  const { state, dispatch } = useContext(AppContext);
  const router = useRouter();

  const initData = async () => {
    const data = await apiGetLobbyInfo(router.query.lobby);

    if (data.chat.length) {
      console.log('we have a chat!', data.chat);

      setChatMessages(data.chat);
    }
    if (data.users) {
      setUsers(data.users);
    }
  };

  // state.socket.on('userJoined', (message) => {
  //   setUsers(message);
  // });

  state.socket.on('disconnected', () => {
    console.log('Disconnected!!!');
    router.push('/');
  });

  const onLobbyEntrance = () => {
    console.log('USER Avatar', state.avatar,);
    
    const message = userCreate(
      router.query.lobby,
      state.username,
      state.userSurname,
      state.avatar,
      state.userId,
      state.userRole,
      state.dealer,
    );
    state.socket.emit('joinRoom', message);
  };

  const onLobbyReconnect = (user: IUser) => {
    dispatch(setRoomId(router.query.lobby));
    dispatch(setUserId(user.id));
    dispatch(setUsername(user.username));
    dispatch(setUserSurname(user.userSurname));
    dispatch(setUserAvatar(user.avatar));
    dispatch(setUserRole(user.userRole));
    dispatch(setDealer(user.dealer));
  };

  useEffect(() => {
    if (lobbyInfo.chat.length) {
      setChatMessages(lobbyInfo.chat);
    }
    if (lobbyInfo.users) {
      setUsers(lobbyInfo.users);
    }

    if (!state.username) {
      state.socket.emit('userRoomReconnect', {
        roomId: router.query.lobby,
        userId: appStorage.getSession(),
      });
      state.socket.on('reconnectToLobby', (message: IUser) => {
        onLobbyReconnect(message);
        onLobbyEntrance();
      });
    } else {
      onLobbyEntrance();
    }
  }, []);

  const onRemove = (user: IUser) => {
    setIsOpenKickUser(true);
    setDeletedUser(user)
    console.log(user)
  }

  const onOpenPopUp = (isOpen: boolean) => {
    setIsOpenKickUser(isOpen);
  }

  return (
    <div className={state.dealer ? classes.containerDealer : classes.containerUser}>
      <Grid container style={{ height: '100%' }}>
        {state.dealer && users && <LobbyDealer users={users} onRemove={onRemove}/>}
        {!state.dealer && users && <LobbyUser users={users} onRemove={onRemove}/>}
        {deletedUser && <KickPlayerPopup isOpenKickUser={isOpenKickUser} onOpenPopUp={onOpenPopUp} deletedUser={deletedUser}/>}
        <Grid item xs={12} md={3} sm={5} className={classes.chatPartContainer}>
          {chatMessages && <Chat chatMessages={chatMessages} />}
          {!chatMessages && <Chat chatMessages={chatMessages} />}
        </Grid>
      </Grid>
    </div>
  );
};

export default Lobby;
