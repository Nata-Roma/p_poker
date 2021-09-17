
import { Grid, Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

export const LateMemberAccess = ({ requestToJoin, lateMember, onAllow, onRoomLeaveLateMember, classBtn }) => (
    <Dialog open={requestToJoin} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" >
          <DialogTitle id="alert-dialog-title">{`Member ${lateMember.username} ${lateMember.userSurname} is asking your authorization to join.` }</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" align="center">
              Do you agree to let this late member in?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
          <Grid container justifyContent="space-around">
            <Box boxShadow={4} mb={1}>
              <Button className={classBtn} onClick={onAllow} > YES </Button>
            </Box>
            <Box boxShadow={4} mb={1}>
              <Button className={classBtn} onClick={onRoomLeaveLateMember} > NO </Button>
            </Box>            
          </Grid>
          </DialogActions>
        </Dialog>
);