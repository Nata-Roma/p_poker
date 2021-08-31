import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStylesMemberList = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
      },
    },
    container: {
      width: '100%',
    },
  }),
);

export default useStylesMemberList;
