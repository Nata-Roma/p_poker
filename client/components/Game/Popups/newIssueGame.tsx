import React, { FC } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  NativeSelect,
} from '@material-ui/core';
import { useStylesCreateIssuePopup } from '@styles/createIssuePopup.style';
import { NewIssueGamePopupProps } from 'utils/interfaces';
import { checkValidateIssue, generateErrorName } from 'components/Lobby/lobbyDealerHelpers';

export const NewIssueGamePopup: FC<NewIssueGamePopupProps> = ({
  onIssueCreate,
  isOpen,
  onAddCloseIssue,
  issues
}) => {
  const classes = useStylesCreateIssuePopup();
  const [ priority, setPriority ] = React.useState('low');
  const [ issueName, setIssueName ] = React.useState('');

  const onCreateClick = () => {
    onIssueCreate({
      issueName,
      priority,
    });
    setIssueName('');
  };

  const disabled = checkValidateIssue(issueName, issues);
  const errorInfo = generateErrorName(issueName, issues);
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={onAddCloseIssue}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" style={{ textAlign: 'center' }}>
          Create Issue
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Issue"
            fullWidth
            value={issueName}
            onChange={(e) => setIssueName(e.target.value)}
            required
            error={disabled}
            helperText={errorInfo}
          />
          <FormControl className={classes.select}>
            <InputLabel htmlFor="issue">Priority:</InputLabel>
            <NativeSelect
              fullWidth
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              inputProps={{
                name: 'issue',
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
                onClick={onCreateClick}
                color="primary"
                variant="contained"
                fullWidth
                disabled={disabled}
              >
                Create
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                onClick={onAddCloseIssue}
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