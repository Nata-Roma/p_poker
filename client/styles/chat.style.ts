import { makeStyles } from '@material-ui/core';

const useStylesChat = makeStyles({
  container: {
    paddingRight: '10px',
    paddingLeft: '5px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  inputBox: {
    paddingRight: '5px'
  },
});

export default useStylesChat;
