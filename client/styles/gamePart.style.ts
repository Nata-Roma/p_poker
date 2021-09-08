import { makeStyles, Theme } from '@material-ui/core';

const useStylesGamePart = makeStyles((theme: Theme) => ({
  container: {
    padding: '10px 10px 0',
    height: '100%',
    boxShadow: '1px 0 3px rgba(0, 0, 0, 0.3)',
    [theme.breakpoints.down(700)]: {
      height: '100%',
      paddingBottom: '20px',
    },
  },
  btn: {
    width: '190px',
  },
  mBottom: {
    marginBottom: '20px',
  },
  issuesContainer: {
    maxHeight: '30vh',
    width: 270,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 0,
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#60dabf',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: '#8fe4d1',
    },

    '&::-webkit-scrollbar-track': {
      backgroundColor: '#ccc',
    },

    '&::-webkit-scrollbar-track:hover': {
      backgroundColor: '#eee',
    },

    [theme.breakpoints.down(960)]: {
      maxHeight: '30vh',
    },
  },
}));

export default useStylesGamePart;
