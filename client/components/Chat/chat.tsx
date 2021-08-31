import { Button, Grid, Input } from '@material-ui/core';
import useStylesChat from '@styles/chat.style';

export const Chat = () => {
  const classes = useStylesChat();

  return (
    <div  className={classes.container}>
      Chat
      <Grid container wrap='nowrap'>
        <Grid item xs={10}>
          <Input placeholder="Your message..." fullWidth />
        </Grid>
        <Grid item xs={2}>
          <Button>Send</Button>
        </Grid>
      </Grid>
    </div>
  );
};
