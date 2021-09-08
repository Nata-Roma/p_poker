import React, { FC } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import { KickPlayerProps } from "utils/interfaces";

const KickPlayerPopup: FC<KickPlayerProps> = ({ isOpenKickUser, onOpenPopUp, deletedUser }) => {
  const onDeleteUser = () => {
    onOpenPopUp(false);
  }

  const handleClose = () => {
    onOpenPopUp(false);
  }

  return (
    <div>
      <Dialog
        open={isOpenKickUser}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" style={{ textAlign: "center" }}>
          Kick player?
        </DialogTitle>
        <DialogContent>
          Are you really want to remove player {deletedUser.username} {deletedUser.userSurname} from game session?
        </DialogContent>
        <DialogActions>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button color="primary" variant="contained" fullWidth onClick={onDeleteUser}>
                Yes
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button color="primary" variant="outlined" fullWidth onClick={handleClose}>
                No
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default KickPlayerPopup;
