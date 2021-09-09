import { makeStyles, Theme } from '@material-ui/core';

const useStylesGamePart = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(2),
    height: '100%',
    boxShadow: '1px 0 3px rgba(0, 0, 0, 0.3)',
    [theme.breakpoints.down(700)]: {
      height: '100%',
      paddingBottom: theme.spacing(2),
    },
  },
  btn: {
    width: '190px',
  },
  mBottom: {
    marginBottom: '20px',
  },
  issuesContainer: {
    maxHeight: '40vh',
    width: 270,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 0,
    marginBottom: theme.spacing(2),
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
  statContainer: {
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  timerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    // padding: theme.spacing(2),
  },
  timerContainerWrapper: {
    padding: theme.spacing(2)
  },
  timeContainer: {
    padding: theme.spacing(5),
  },
  timerBox: {
    width: '148px',
    height: '53px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '4px'
  },
  timerText: {
    fontSize: '34px',
    fontWeight: 500
  },
  timerColon: {
    fontSize: '20px',
    fontWeight: 400,
    padding: theme.spacing(1), 
  },
  btnTimer: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.secondary.dark,
    fontSize: '17px',
    marginTop: 'auto'
  }
}));

export default useStylesGamePart;
