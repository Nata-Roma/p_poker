import React, { ChangeEvent, FC, useContext } from "react";
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
import AddIcon from '@material-ui/icons/Add';
import { useStylesCreateIssuePopup } from "@styles/createIssuePopup.style";
import { CreateIssuePopupProps } from "utils/interfaces";
import { checkValidateIssue, generateErrorName } from "./lobbyDealerHelpers";

const CreateIssuePopup: FC<CreateIssuePopupProps> = ({ onIssueCreate, issues }) => {
  const classes = useStylesCreateIssuePopup();
  const [priority, setPriority] = React.useState('low');
  const [issueName, setIssueName] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const createHandleClose = () => {
    setOpen(false);
    onIssueCreate({
      issueName,
      priority,
    })
    setIssueName('');
  };

  const handleClose = () => {
    setOpen(false);
  }

  const handleChangePriority = (e: ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value);
  }

  const onChangeIssueName = (e: ChangeEvent<HTMLInputElement>) => {
    setIssueName(e.target.value);
  }

  const disabled = checkValidateIssue(issueName, issues);
  const errorInfo = generateErrorName(issueName, issues);

  return (
    <div>
      <AddIcon color="primary" onClick={handleClickOpen} className={classes.btn}>
        Create new Issue
      </AddIcon>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" style={{textAlign:'center'}}>Create Issue</DialogTitle>
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
            error={disabled}
            helperText={errorInfo}
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
            <Button onClick={createHandleClose} color="primary" variant="contained" fullWidth disabled={disabled}>
            Create
          </Button>
            </Grid>
            <Grid item xs={6}>
            <Button onClick={handleClose} color="primary" variant="outlined" fullWidth>
            Cancel
          </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateIssuePopup;