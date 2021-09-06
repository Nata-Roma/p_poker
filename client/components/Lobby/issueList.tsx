import { ChangeEvent, FC, useContext, useState } from "react";
import {
  Typography,
  Grid,
  Button,
  FormControl,
  InputLabel,
  NativeSelect,
  FormHelperText,
} from "@material-ui/core";
import { useStylesIssueList } from "@styles/issueList.style";
import CreateIssuePopup from "./createIssuePopup";
import { IGameIssue, IssueData } from "utils/interfaces";

interface IssueListProps {
  onIssueCreate: (issue: IGameIssue) => void;
  onIssueDelete: (issue: string) => void;
  issues: Array<IGameIssue>
}

const IssueList: FC<IssueListProps> = ({onIssueCreate, onIssueDelete, issues}) => {
  const classes = useStylesIssueList();
  const[issueEdit, setIssueEdit] = useState('');

  const onIssueEdit = (e: ChangeEvent<HTMLSelectElement>) => {
    setIssueEdit(e.target.value);
  }

  return (
    <Grid item container spacing={2} justifyContent="center">
      <Typography variant="h4" align="center" gutterBottom >
        Issues:
      </Typography>
      <Grid container item alignItems="center">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="issue">No Issue</InputLabel>
          <NativeSelect
          value={issueEdit}
          onChange={onIssueEdit}
          inputProps={{
            name: 'issue',
          }}
          >
          {issues.map((issue) => {
            return (
              <>
              <option value="" style={{display: 'none'}}></option>
              <option value={issue.issueName} key={issue.issueName}>
                {issue.issueName} | Priority: {issue.priority}
                </option>
              </>
            )
          })}
          </NativeSelect>
          <FormHelperText>select an issue to edit</FormHelperText>
        </FormControl>
        <CreateIssuePopup onIssueCreate={onIssueCreate}/>
        <Button color="primary" variant="outlined" onClick={() => onIssueDelete(issueEdit)} className={classes.deleteButton}>
            Delete Issue
          </Button>
      </Grid>
      </Grid>
  );
};

export default IssueList;
