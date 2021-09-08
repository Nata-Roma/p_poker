import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStylesIssueList = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    deleteButton: {
      width: '190px',
    },
    btn: {
      width: '190px',
    },
    gap: {
      gap: '10px'
    }
  }),
);
