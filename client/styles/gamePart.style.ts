import { makeStyles, Theme } from '@material-ui/core';

const useStylesGamePart = makeStyles((theme: Theme) => ({
  btn: {
    width: '190px',
  },
  mBottom: {
    marginBottom: '20px',
  },
  issuesContainer: {
    maxHeight: '60vh',
    overflowY: 'auto',
    [theme.breakpoints.down(960)]: {
      maxHeight: '20vh',
    },
  }
  
}));

export default useStylesGamePart;
