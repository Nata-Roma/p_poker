import React, { ChangeEvent, FC } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  NativeSelect,
} from "@material-ui/core";
import CreateIcon from '@material-ui/icons/Create';
import { useStylesCreateIssuePopup } from "@styles/createIssuePopup.style";
import { ChangeIssueProps } from "utils/interfaces";

const ChangeIssuePopup: FC<ChangeIssueProps> = ({
  issueChange,
  setIssueChange,
  onIssueChange,
}) => {
  const classes = useStylesCreateIssuePopup();
  const[priority, setPriority] = React.useState('low');
  const[issueName, setIssueName] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const changeIssue = () => {
    // setIssueChange(false);
    setOpen(false);
    onIssueChange({
      issueName,
      priority,
    });
    setIssueName('');
  };

  const handleClose = () => {
    // setIssueChange(false);
    setOpen(false);
    setIssueName('');
  };

  const handleChangePriority = (e: ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value);
  };

  const onChangeIssueName = (e: ChangeEvent<HTMLInputElement>) => {
    setIssueName(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const disabled = issueName.length < 3;

  return (
    <div>
      <CreateIcon color="primary"  className={classes.btn} onClick={handleClickOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" style={{ textAlign: "center" }}>
          Change Issue
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Issue"
            fullWidth
            value={issueName}
            onChange={onChangeIssueName}
            required
          />
          <FormControl className={classes.select}>
            <InputLabel htmlFor="issue">Priority:</InputLabel>
            <NativeSelect
              fullWidth
              value={priority}
              onChange={handleChangePriority}
              inputProps={{
                name: "issue",
              }}
            >
              <option value="low">Low</option>
              <option value="middle">Middle</option>
              <option value="hight">Hight</option>
            </NativeSelect>
            <FormHelperText>choose the priority of issue</FormHelperText>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                onClick={changeIssue}
                disabled={disabled}
                color="primary"
                variant="contained"
                fullWidth
              >
                Save
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                onClick={handleClose}
                color="primary"
                variant="outlined"
                fullWidth
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ChangeIssuePopup;
