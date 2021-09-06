import { makeStyles, createStyles, Theme } from '@material-ui/core';

const useStylesFooter = makeStyles((theme: Theme) =>
  createStyles({
    footerRoot: {
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
        alignItems: 'flex-start',
      },
    },
    footerContainer: {
      padding: theme.spacing(1),
      cursor: 'pointer',
    },
  }),
);

export default useStylesFooter;
