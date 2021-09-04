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
    issueButtom: {
      height: '36px'
    },
    positionButtom: {
      alignSelf: 'center',
    }
  }),
);
