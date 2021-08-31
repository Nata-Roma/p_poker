import { Button, makeStyles, Typography } from '@material-ui/core';
import Link from 'next/link';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    width: '500px',
    flexDirection: 'column',
    backgroundColor: '#a7f8a0',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 'auto',
    height: 'calc(100vh / 2)',
    padding: '10px',
  },
  buttons_wrapper: {
    marginTop: '50px',
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  redBtn: {
    backgroundColor: 'red',
    color: '#fff',
  },
});

interface MakeChoiceProps {
  choice: (color: string) => void;
  message: string;
}

export const MakeChoice = ({ choice, message }: MakeChoiceProps) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="h3" color="primary" align="center">
        {message}
      </Typography>
      <div className={classes.buttons_wrapper}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => choice('blue')}
        >
          Blue Peel
        </Button>
        <Link href="/lobby">
          <Button
            variant="contained"
            className={classes.redBtn}
            onClick={() => choice('red')}
          >
            Red Peel
          </Button>
        </Link>
      </div>
    </div>
  );
};
