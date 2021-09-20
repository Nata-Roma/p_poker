import { FC } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export interface WaitForAuthPopupProps {
  isVoting: boolean;
}

const WaitForAuthPopup: FC<WaitForAuthPopupProps> = ({ isVoting }) => {
  return (
    <Dialog open={isVoting} aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title' style={{ textAlign: 'center' }}>
        Please wait for authorization
      </DialogTitle>
    </Dialog>
  );
};

export default WaitForAuthPopup;
