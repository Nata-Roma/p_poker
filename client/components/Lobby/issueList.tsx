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
import { IssueData } from "utils/interfaces";

const IssueList: FC = () => {
  const classes = useStylesIssueList();
  const[issueForEdit, setIssueForEdit] = useState('');
  const[issues, setIssues] = useState<Array<IssueData>>([])
  const onCreate = (issue: IssueData) => {
    setIssues([
      ...issues,
      issue
    ])
  }

  const onIssueForEdit = (e: ChangeEvent<HTMLSelectElement>) => {
    setIssueForEdit(e.target.value);
  }

  const onDelete = () => {
    setIssues((prevIssues) => {
      const newIssues = prevIssues.slice().filter((item) => item.issueName !== issueForEdit);
      return newIssues;
    })
  }

  return (
    <Grid item container spacing={2} justifyContent="center">
      <Typography variant="h4" align="center" gutterBottom >
        Issues:
      </Typography>
      <Grid container item alignItems="center">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="issue">Issue</InputLabel>
          <NativeSelect
          value={issueForEdit}
          onChange={onIssueForEdit}
          inputProps={{
            name: 'issue',
            id: 'issue',
          }}
          >
          {issues.map((issue) => {
            return (
              <>
              <option value="" style={{display: 'none'}}></option>
              <option value={issue.issueName} key={issue.id}>{issue.issueName} | Priority: {issue.priority}</option>
              </>
            )
          })}
          </NativeSelect>
          <FormHelperText>select an issue to edit</FormHelperText>
        </FormControl>
        <CreateIssuePopup onCreate={onCreate}/>
        <Button color="primary" variant="outlined" onClick={onDelete} className={classes.deleteButton}>
            Delete Issue
          </Button>
      </Grid>
      </Grid>
  );
};

export default IssueList;
