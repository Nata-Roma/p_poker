import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FC } from 'react';
import { FormControlLabel, Grid, makeStyles, Switch, Theme, createStyles } from '@material-ui/core';
import { roles } from 'utils/configs';


const useStyleDialog = makeStyles((theme: Theme) => 
createStyles({
  rightPad: {
    padding: theme.spacing(1, 2),
  }
}))
interface UserDialogProps {
  onDialogClose: () => void;
  confirm: () => void;
  changeName: (username: string) => void;
  changeSurname: (userSurname: string) => void;
  open: boolean;
  onRoleChange: () => void
  role: string
}

export const UserDialog: FC<UserDialogProps> = ({
  onDialogClose,
  open,
  changeName,
  changeSurname,
  confirm,
  onRoleChange,
  role,
}) => {
  const classes = useStyleDialog();
  return (
    <div>
      <Dialog open={open} onClose={onDialogClose}>
        <Grid container justifyContent="space-between" alignItems='center'>
          <Grid item xl={9}>
            <DialogTitle>Connect to lobby</DialogTitle>
          </Grid>
          <Grid item xl={3} className={classes.rightPad}>
            <FormControlLabel
              control={
                <Switch
                  checked={role === roles.observer? true : false}
                  onChange={onRoleChange}
                  name="checkedB"
                  color="primary"
                />
              }
              labelPlacement="start"
              label="Connect as Observer"
            />
          </Grid>
        </Grid>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            onChange={(e) => changeName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Surname"
            type="text"
            fullWidth
            onChange={(e) => changeSurname(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={confirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
