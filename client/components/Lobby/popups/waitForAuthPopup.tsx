import React, { FC, useContext, useState, useEffect, SetStateAction, Dispatch  } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export interface WaitForAuthPopupProps {
  isGameStarted: boolean;  
  isVoting: boolean;
  isAutoJoin: boolean;
}

const WaitForAuthPopup: FC<WaitForAuthPopupProps> = ({ isGameStarted, isVoting, isAutoJoin }) => {

  const waitText = isAutoJoin ? 'Please wait' : 'Please wait for authorization.';

  return (      
        <Dialog
          open={isGameStarted}    
          aria-labelledby="form-dialog-title"
          
        >
          <DialogTitle id="form-dialog-title" style={{ textAlign: 'center' }}>
            {waitText}
          </DialogTitle>
          { isVoting && <DialogContent style={{ textAlign: 'center', color: '#5a2290' }}>
            voting in process.
          </DialogContent>}
        </Dialog>  
  );
};

export default WaitForAuthPopup;
