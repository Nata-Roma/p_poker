import { ChangeEvent, FC, useState } from 'react';
import {
  Typography,
  Grid,
  Button,
  FormControl,
  InputLabel,
  FormHelperText,
  Select,
  MenuItem,
} from '@material-ui/core';
import { useStylesIssueList } from '@styles/issueList.style';
import CreateIssuePopup from './createIssuePopup';
import ChangeIssuePopup from './changeIssuePopup';
import { IssueData, IssueListProps } from 'utils/interfaces';

const IssueList: FC<IssueListProps> = ({
  onIssueCreate,
  onIssueDelete,
  onIssueChangeEdit,
  issues,
}) => {
  const classes = useStylesIssueList();
  const[issueEdit, setIssueEdit ] = useState('');
  const[issueChange, setIssueChange] = useState(false);

  const onIssueEdit = (e: ChangeEvent<HTMLSelectElement>) => {
    setIssueEdit(e.target.value);
    setIssueChange(true)
  };

  const onIssueChange = (changedIssue: IssueData) => {
    onIssueChangeEdit({
      prevValue: issueEdit,
      nextValue: changedIssue.issueName,
      priority: changedIssue.priority
    });
  }

  return (
    <Grid item container spacing={2} justifyContent="center">
      <Typography variant="h4" align="center" gutterBottom>
        Issues:
      </Typography>
      <Grid container item alignItems="center">
        <FormControl className={classes.formControl}>
          <InputLabel id="select-issue">Issues:</InputLabel>
          <Select
            labelId="select-issue"
            value={issueEdit}
            onChange={onIssueEdit}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {issues &&
              issues.map((issue) => (
                <MenuItem value={issue.issueName} key={issue.issueName}>
                  {issue.issueName}
                </MenuItem>
              ))}
          </Select>
          <FormHelperText>select an issue to edit</FormHelperText>
        </FormControl>

        <CreateIssuePopup onIssueCreate={onIssueCreate} />
        <Button
          color="primary"
          variant="outlined"
          onClick={() => onIssueDelete(issueEdit)}
          className={classes.deleteButton}
        >
          Delete Issue
        </Button>
        <ChangeIssuePopup issueChange={issueChange} onIssueChange={onIssueChange} setIssueChange={setIssueChange}/>
      </Grid>
    </Grid>
  );
};

export default IssueList;
