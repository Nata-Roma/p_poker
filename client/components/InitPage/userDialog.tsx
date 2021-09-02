import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FC } from 'react';

interface UserDialogProps {
  onDialogClose: () => void;
  confirm: () => void;
  changeName: (username: string) => void;
  changeSurname: (userSurname: string) => void;
  open: boolean;
}

export const UserDialog: FC<UserDialogProps> = ({
  onDialogClose,
  open,
  changeName,
  changeSurname,
  confirm,
}) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={onDialogClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            onChange={(e) => changeName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="surname"
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
