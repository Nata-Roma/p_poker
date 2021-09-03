import { makeStyles, createStyles, Theme } from '@material-ui/core';

const useStylesFooter = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
        alignItems: 'flex-start',
      },
    },
    container: {
      padding: '10px',
      cursor: 'pointer',
    },
  }),
);

export default useStylesFooter;
