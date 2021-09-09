import { ChangeEvent, FC, useState } from 'react';
import {
  Typography,
  Grid,
  FormControl,
  InputLabel,
  FormHelperText,
  Select,
  MenuItem,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
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
    <Grid item container spacing={2} justifyContent="center" >
      <Typography variant="h4" align="center" gutterBottom>
        Issues:
      </Typography>
      <Grid container item >
        <Grid container item className={classes.issueList}>
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
        </Grid>
      <Grid container item className={classes.gap} alignContent="center" xs={6}>
          <Grid item>
          <CreateIssuePopup onIssueCreate={onIssueCreate} />
          </Grid>
          <Grid item>
          <ClearIcon
          color="error"
          onClick={() => onIssueDelete(issueEdit)}
          className={classes.deleteButton}
        />
          </Grid>
          <Grid item>
          <ChangeIssuePopup issueChange={issueChange} onIssueChange={onIssueChange} setIssueChange={setIssueChange}/>
          </Grid>
        </Grid>
        </Grid>
    </Grid>
  );
};

export default IssueList;
