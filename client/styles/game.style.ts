import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStylesGame = makeStyles((theme: Theme) => createStyles({

  container: {
    // width: '100%',
    height: 'calc(100vh - 56px)',
    [theme.breakpoints.down('xs')]: {
      height: '100%',
    },
  },
  memberPartContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',  
    justifyContent: 'space-between',
    boxShadow: '1px 0 3px rgba(0, 0, 0, 0.3)',
    [theme.breakpoints.down(700)]: {
      height: '300px',
    },
  },
  gamePartContainer: {
    padding: '10px 10px 0',
    height: '100%',
    boxShadow: '1px 0 3px rgba(0, 0, 0, 0.3)',
    [theme.breakpoints.down(700)]: {
      height: '100%',
      paddingBottom: '20px',
    },
  },
  scorePartContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-around',
    alignItems: 'center',
    padding: '20px 5px',
    boxShadow:'1px 0 3px rgba(0, 0, 0, 0.3)',
    [theme.breakpoints.down(700)]: {
      height: '300px',
      minWidth: '100%'
      
    },
  }
})
);

export default useStylesGame;
