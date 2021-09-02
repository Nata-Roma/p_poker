import { makeStyles, Theme } from '@material-ui/core';

export const useStyleHomePage = makeStyles((theme: Theme) => ({
  wrapper: {
    width: '100%',
    height: 'calc(100vh - 56px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
  },
  container: {
    width: '1000px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.5)',
    padding: '50px 20px',
    [theme.breakpoints.down(1020)]: {
      width: '600px',
    }
  },
  title: {
    fontSize: '50px',
    textAlign: 'center',
  },


}));
