import { ChangeEvent, FC, useState } from "react";
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

const IssueList: FC = () => {
  const classes = useStylesIssueList();
  const[openPopup, setOpenPopup] = useState(false);
  const[issueForEdit, SetIssueForEdit] = useState('');

  const onIssueForEdit = (e: ChangeEvent<HTMLSelectElement>) => {
    SetIssueForEdit(e.target.value);
  }
  return (
    <>
      <Typography variant="h4" align="center" gutterBottom >
        Issues:
      </Typography>
      <Grid container>
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
            <option aria-label="None" value="" />
            {/* <option value="22">123</option> */}
          </NativeSelect>
          <FormHelperText>select an issue to edit</FormHelperText>
        </FormControl>
        <Grid item className={classes.positionButtom}>
        <Button
          color="primary"
          variant="contained"
          className={classes.issueButtom}
        >
          Create new issue
        </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default IssueList;
