import React, { FC, useState } from "react";
import CreateIcon from '@material-ui/icons/Create';
import CheckIcon from '@material-ui/icons/Check';
import { createStyles, makeStyles } from "@material-ui/styles";
import { Theme, Typography, TextField, Grid } from "@material-ui/core";

export const useStylesSettingsGame = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      cursor: 'pointer',
    },
    gameName: {
      fontSize: '18px',
    },
  }),
);

const NameGame: FC = () => {
  const classes = useStylesSettingsGame();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');

  const deactivateEditMode = () => {
    setEditMode(false);
  };

  const activateEditMode = () => {
    setEditMode(true);
  };

  return (
    <Grid container spacing={2}>
      {!editMode &&
        <Grid container item xs={12} justifyContent="center">
          <Typography className={classes.gameName} variant="subtitle2" gutterBottom onClick={activateEditMode} >
            {name || 'enter a name of game'}
          </Typography>
          <CreateIcon className={classes.icon} color="primary" onClick={() => setEditMode(true)} />
        </Grid>
      }
      {editMode &&
        <Grid container item xs={12} justifyContent="center">
          <TextField placeholder='enter a name of game' autoFocus value={name} onChange={(e) => setName(e.target.value)} onBlur={deactivateEditMode} />
          <CheckIcon className={classes.icon} color="primary" onClick={() => setEditMode(false)} />
        </Grid>
      }
    </Grid>
  )
}

export default NameGame;