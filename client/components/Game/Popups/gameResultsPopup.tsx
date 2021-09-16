import React, { ChangeEvent, Dispatch, FC, SetStateAction, useContext, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import { Box } from "@material-ui/core";
import { useStylesGameResultsPopup } from "@styles/gameResultsPopup.style";
import AppContext from "store/store";
import { IGameIssue } from "utils/interfaces";

export interface IGameResultPopupProps {
  onLeaveRoom: () => void;
  roomId: string | string[];
}

const GameResultPopup: FC<IGameResultPopupProps> = ({ onLeaveRoom, roomId }) => {
  const classes = useStylesGameResultsPopup();
  const [open, setOpen] = React.useState(false);
  const [issues, setIssues] = React.useState<IGameIssue[]>([]);
  const { state } = useContext(AppContext);

  const handleClickOpen = () => {
    setOpen(true);
    console.log('open')
    state.socket.on('showGameResults', (issues:IGameIssue[] ) => {
      console.log(issues, 'DATA WITH SCORE!')
      setIssues(issues);
    })
    state.socket.emit('showResults', { roomId })
  };

  const createHandleClose = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onLeaveRoomInPopup = () => {
    onLeaveRoom();
  }

  return (
    <div>
      <Box boxShadow={2} mr={10}>
        <Button
          variant="outlined"
          className={classes.btn}
          // onClick={() => setIsLeaveOpen(true)}
          onClick={handleClickOpen}
        >
          Stop Game
        </Button>
      </Box>
      {/* <Button color="primary" onClick={handleClickOpen} className={classes.btn}>
        Stop gmae
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" style={{ textAlign: "center" }}>
          Game results
        </DialogTitle>
        <DialogContent>

        </DialogContent>
        <DialogActions>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Button
                onClick={createHandleClose}
                color="primary"
                variant="contained"
                fullWidth
              >
                Export
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                onClick={onLeaveRoomInPopup}
                color="primary"
                variant="outlined"
                fullWidth
              >
                Leave room
              </Button>
            </Grid>
            <Grid item xs={4}>
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

export default GameResultPopup;
