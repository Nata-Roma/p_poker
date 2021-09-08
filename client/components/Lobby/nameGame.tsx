import React, { FC, useState } from "react";
import CreateIcon from '@material-ui/icons/Create';
import CheckIcon from '@material-ui/icons/Check';
import { Typography, TextField, Grid } from "@material-ui/core";
import { useStylesSettingsGame } from "@styles/settings.style";

const NameGame: FC = () => {
  const classes = useStylesSettingsGame();;
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
        <Grid container item xs={12} justifyContent="center" >         
          <Typography variant="h6" align="left" gutterBottom>
            Spring:
          </Typography>     
          <Typography className={classes.gameName} variant="subtitle2" gutterBottom onClick={activateEditMode} >
            {name || 'enter spring number'}
          </Typography>
          
          <CreateIcon className={classes.icon} color="primary" onClick={() => setEditMode(true)} />
        </Grid>
      }
      {editMode &&
        <Grid container item xs={12} justifyContent="center">
          <TextField 
            label='Spring: '
            placeholder='enter spring number'
            autoFocus required value={name}
            type='number'
            onChange={(e) => setName(e.target.value)}
            onBlur={deactivateEditMode}
            style={{padding: '0 10px'}}          
          />
          <CheckIcon className={classes.icon} color="primary" onClick={deactivateEditMode} />
        </Grid>
      }
    </Grid>
  )
}

export default NameGame;