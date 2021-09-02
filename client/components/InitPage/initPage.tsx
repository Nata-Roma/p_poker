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
  rooms: Array<{ name: string; value: string }>;
}

export const InitPage: FC<MakeChoiceProps> = ({ message, rooms }) => {
  const classes = useStyleHomePage();
  const router = useRouter();
  const [ open, setOpen ] = useState(false);
  const [ username, setUsername ] = useState('');
  const [ userSurname, setUserSurname ] = useState('');
  const [ room, setRoom ] = useState('');
  const { socket } = useContext(AppContext);
  console.log(socket);

  const goToLobby = (id: string) => {
    router.push({
      pathname: '/[lobby]',
      query: { lobby: id },
    });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const onDialogClose = () => {
    setOpen(false);
  };

  const onCreateRoom = async () => {
    if (username && userSurname) {
      const id = nanoid();
      const config = {
        data: {
          room: id,
          user: {
            username,
            userSurname,
            id: socket.id,
          },
        },
      };
      onDialogClose();
      const created = await axios.post(`${BASE_URL}/rooms`, config);
      console.log(created);
      goToLobby(id);
    }
  };

  const onChangeUsername = (username: string) => {
    setUsername(username);
  };

  const onChangeUserSurname = (userSurname: string) => {
    setUserSurname(userSurname);
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
              onClick={handleClickOpen}
            >
              Start New game
            </Button>
            <UserDialog
              onDialogClose={onDialogClose}
              open={open}
              changeName={onChangeUsername}
              changeSurname={onChangeUserSurname}
              confirm={onCreateRoom}
            />
          </Grid>
          <Grid container item alignItems="center" spacing={2}>
            <Grid item sm={6} xs={12}>
              <RoomSelect
                rooms={rooms.map((item) => item.name)}
                onRoomSelect={setRoom}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  goToLobby(room);
                }}
              >
                Connect to Room
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
