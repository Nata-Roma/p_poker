import { useContext, useEffect } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { useStyleHomePage } from '@styles/initPage.style';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { BASE_URL } from 'utils/apiConfig';
import { UserDialog } from './Dialog/userDialog';
import React from 'react';
import { RoomSelect } from './roomSelect';
import {
  setDealer,
  setRoomId,
  setUserId,
  setUserRole,
} from 'store/actionCreators';
import AppContext from 'store/store';
import { roles, userInitData } from 'utils/configs';
import { userCreate } from 'utils/userCreate';
import { IDialogUsers } from 'utils/interfaces';
import getFormattedImgDataLink from 'utils/imgToDatalink';

interface MakeChoiceProps {
  message: string;
  rooms: Array<string>;
}

export const InitPage: FC<MakeChoiceProps> = ({ message, rooms }) => {
  const classes = useStyleHomePage();
  const router = useRouter();
  const [ roomList, setRoomList ] = useState<Array<string>>(rooms);
  const [ openCreate, setOpenCreate ] = useState(false);
  const [ openConnect, setOpenConnect ] = useState(false);
  const [ userData, setUserData ] = useState({ ...userInitData });
  const [ role, setRole ] = useState(roles.member);
  const [ room, setRoom ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const { state, dispatch } = useContext(AppContext);

  state.socket.on('connect', () => {});

  state.socket.on('roomList', (message) => {
    setRoomList(message);
  });

  const goToLobby = (id: string) => {
    const userId = state.socket.id;
    const message = userCreate(
      id,
      userData.username.nameData,
      userData.userSurname.nameData,
      userData.avatar,
      userId,
    );
    dispatch(setUserId(message.user.id));
    state.socket.emit('joinRoom', message);
    router.push({
      pathname: '/[lobby]',
      query: { lobby: id },
    });
  };

  const onCreateRoom = async () => {
    if (userData.username.statusData && userData.userSurname.statusData) {
      const id = nanoid();
      const config = {
        data: id,
      };
      setOpenCreate(false);
      const created = await axios.post(`${BASE_URL}/rooms`, config);
      dispatch(setRoomId(id));
      dispatch(setDealer(true));
      goToLobby(id);
    }
  };

  const onEnterRoom = () => {
    if (
      userData.username.statusData &&
      userData.userSurname.statusData &&
      room
    ) {
      dispatch(setRoomId(room));
      setOpenConnect(false);
      goToLobby(room);
    }
  };

  const clearUserData = () => {
    setUserData({ ...userInitData });
    setRole(roles.member);
  };

  const onCreateCancel = () => {
    if (!loading) {
      setOpenCreate(false);
      clearUserData();
    }
  };
  const onConnectCancel = () => {
    if (!loading) {
      setOpenConnect(false);
      clearUserData();
      dispatch(setUserRole(roles.member));
    }
  };

  const changeUserData = (userData: IDialogUsers) => {
    setUserData(userData);
  };

  const addAvatar = (data: string) => {
    setUserData((prev) => ({ ...prev, avatar: data }));
  };

  useEffect(
    () => {
      if (role === roles.observer) {
        dispatch(setUserRole(role));
      } else {
        dispatch(setUserRole(role));
      }
    },
    [ role ],
  );

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <Typography variant="h3" align="center">
          {message}
        </Typography>
        <Typography variant="h4" color="primary" align="center">
          Start your planning:
        </Typography>
        <Grid container>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenCreate(true)}
            >
              Start New game
            </Button>
            <UserDialog
              onDialogClose={onCreateCancel}
              open={openCreate}
              confirm={onCreateRoom}
              onRoleChange={() =>
                setRole(
                  (prev) =>
                    prev === roles.observer ? roles.member : roles.observer,
                )}
              role={role}
              loading={(status) => setLoading(status)}
              changeUserData={changeUserData}
              addAvatar={addAvatar}
              userInfo={userData}
            />
          </Grid>
          <Grid container item alignItems="center" spacing={2}>
            <Grid item sm={6} xs={12}>
              <RoomSelect
                rooms={roomList.map((item) => item)}
                onRoomSelect={setRoom}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setOpenConnect(true);
                }}
              >
                Connect to Room
              </Button>
              <UserDialog
                onDialogClose={onConnectCancel}
                open={openConnect}
                confirm={onEnterRoom}
                onRoleChange={() =>
                  setRole(
                    (prev) =>
                      prev === roles.observer ? roles.member : roles.observer,
                  )}
                role={role}
                loading={(status) => setLoading(status)}
                changeUserData={changeUserData}
                addAvatar={addAvatar}
                userInfo={userData}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
