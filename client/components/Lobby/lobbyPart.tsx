import { Button, Typography, Grid } from '@material-ui/core';
import useStylesLobbyPart from '@styles/lobbyPart.style';
import { MemberList } from 'components/Lobby/memberList';
import { UserCard } from 'components/userCard';
import Link from 'next/link';

export const LobbyPart = () => {
  const classes = useStylesLobbyPart();
  return (
    <div className={classes.container}>
      <Grid item>
        <Typography variant="h4" align="center" gutterBottom>
          Lobby Title
        </Typography>
      </Grid>
      <Grid item  className={classes.mBottom}>
        <Typography variant="subtitle2">Dealer:</Typography>
        <UserCard user={{ username: 'Koza Nostra', avatar: '' }} />
      </Grid>
      <Grid item className={classes.mBottom}>
        <Link href="/lobby/game">
          <Button color="primary" variant="contained">
            Start Game
          </Button>
        </Link>
      </Grid>
      <Grid item container justifyContent='flex-end' className={classes.mBottom}>
        <Link href="/">
          <Button variant="outlined" className={classes.btn}>
            Exit
          </Button>
        </Link>
      </Grid>
      <Grid item container>
        <MemberList />
      </Grid>
    </div>
  );
};
