import React, { FC, useContext, useState } from "react";
import CreateIcon from '@material-ui/icons/Create';
import CheckIcon from '@material-ui/icons/Check';
import { createStyles, makeStyles } from "@material-ui/styles";
import { Theme, Typography, TextField, Grid } from "@material-ui/core";
import { setSpring } from 'store/actionCreators';
import AppContext from "store/store";

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
  const classes = useStylesSettingsGame();;
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const { state, dispatch } = useContext(AppContext);


  const deactivateEditMode = () => {
    setEditMode(false);
  };

  const activateEditMode = () => {
    setEditMode(true);
  };

  const setSpringName = () => {
    console.log('set spring and name', name )
    dispatch(setSpring(name));
    console.log('name', name )
    console.log('state', state.gameSpring);
    deactivateEditMode();
  };

  console.log('name', name )
  console.log('state', state.gameSpring);

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
            onBlur={ () => setSpringName()}
            style={{padding: '0 10px'}}          
          />
          <CheckIcon className={classes.icon} color="primary" onClick={deactivateEditMode} />
        </Grid>
      }
    </Grid>
  )
}

export default NameGame;