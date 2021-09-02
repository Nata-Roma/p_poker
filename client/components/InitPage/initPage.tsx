import { useContext } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { useStyleHomePage } from '@styles/initPage.style';
import axios from 'axios';
import { nanoid } from 'nanoid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { AppContext } from 'store/store';
import { BASE_URL } from 'utils/apiConfig';
import { UserDialog } from './userDialog';
import React from 'react';
import { RoomSelect } from './roomSelect';

interface MakeChoiceProps {
  message: string;
  rooms: Array<string>;
}

export const InitPage: FC<MakeChoiceProps> = ({ message, rooms }) => {
  const classes = useStyleHomePage();
  const router = useRouter();
  const [roomList, setRoomList] = useState<Array<string>>(rooms)
  const [ openCreate, setOpenCreate ] = useState(false);
  const [ openConnect, setOpenConnect ] = useState(false);
  const [ username, setUsername ] = useState('');
  const [ userSurname, setUserSurname ] = useState('');
  const [ room, setRoom ] = useState('');
  const { socket } = useContext(AppContext);

  socket.on('connect', () => {
    console.log('connected to socket', socket);
  });

  socket.on('roomList', (message) => {
    console.log(message);
    setRoomList(message);
  })

  const createMessage = (id: string) => {
    return {
      roomId: id,
      user: {
        username,
        userSurname,
        id: socket.id,
      },
    };
  };

  const goToLobby = (id: string) => {
    const message = createMessage(id);
    socket.emit('joinRoom', message);
    router.push({
      pathname: '/[lobby]',
      query: { lobby: id },
    });
  };

  const onCreateRoom = async () => {
    console.log(username, userSurname);

    if (username && userSurname) {
      const id = nanoid();
      const config = {
        data: id,
      };
      setOpenCreate(false);
      const created = await axios.post(`${BASE_URL}/rooms`, config);
      console.log(created);
      goToLobby(id);
    }
  };

  const onEnterRoom = () => {
    if (username && userSurname && room) {
      setOpenConnect(false);
      goToLobby(room);
    }
  };

  const clearUserData = () => {
    setUsername('');
    setUserSurname('');
  };

  const onCreateCancel = () => {
    setOpenCreate(false);
    clearUserData();
  };
  const onConnectCancel = () => {
    setOpenConnect(false);
    clearUserData();
  };

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
              changeName={(name) => setUsername(name)}
              changeSurname={(name) => setUserSurname(name)}
              confirm={onCreateRoom}
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
                changeName={(name) => setUsername(name)}
                changeSurname={(name) => setUserSurname(name)}
                confirm={onEnterRoom}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
