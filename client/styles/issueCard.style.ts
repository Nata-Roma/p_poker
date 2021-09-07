import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const useStylesIssueCard = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 63,
      minHeight: 63,
      maxHeight: 63,
      width: 250,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing(1),
      cursor: 'pointer',
    },
    title: {
      fontSize: 12,
      padding: 0,
    },
    text: {
      fontSize: 16,
      padding: 0,
    },
    activeCard: {
      backgroundColor: theme.palette.primary.light,
      color: '#fff',
    },
  }),
);
