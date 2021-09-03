import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FC, useState } from 'react';
import {
  FormControlLabel,
  Grid,
  makeStyles,
  Switch,
  Theme,
  createStyles,
} from '@material-ui/core';
import { roles } from 'utils/configs';
import { CreateAvatar } from './avatar';
import { DialogInputBlock } from './dialogInputBlock';
import { IDialogUsers } from 'utils/interfaces';

const useStyleDialog = makeStyles((theme: Theme) =>
  createStyles({
    rightPad: {
      padding: theme.spacing(1, 2),
    },
  }),
);

interface UserDialogProps {
  onDialogClose: () => void;
  confirm: () => void;
  changeUserData: (value: IDialogUsers) => void;
  open: boolean;
  onRoleChange: () => void;
  role: string;
  loading: (status: boolean) => void;
  addAvatar: (data: string) => void;
  userInfo: IDialogUsers;
}

export const UserDialog: FC<UserDialogProps> = ({
  onDialogClose,
  open,
  changeUserData,
  confirm,
  onRoleChange,
  role,
  loading,
  addAvatar,
  userInfo
}) => {
  const classes = useStyleDialog();

  const [] = useState();

  return (
    <div>
      <Dialog open={open} onClose={onDialogClose}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xl={9}>
            <DialogTitle>Connect to lobby</DialogTitle>
          </Grid>
          <Grid item xl={3} className={classes.rightPad}>
            <FormControlLabel
              control={
                <Switch
                  checked={role === roles.observer ? true : false}
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
        <DialogInputBlock changeUserData={changeUserData} userInfo={userInfo} />
        <DialogContent>
          <CreateAvatar loading={loading} addAvatar={addAvatar} />
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
