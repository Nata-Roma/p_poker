import { Typography, Grid, TextField, Switch } from '@material-ui/core';
import { useStylesSettingsGame } from '@styles/settings.style';
import { ChangeEvent, useState } from 'react';

const GameSettings = () => {
  const classes = useStylesSettingsGame();
  const [fullScoreType, setFullScoreType] = useState('');
  const [shortScoreType, setShortScoreType] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const onFullScoreType = (e: ChangeEvent<HTMLInputElement>): void => {
    setFullScoreType(e.target.value);
  }

  const onChangeFullScoreType = (e: ChangeEvent<HTMLInputElement>): void => {
    setShortScoreType(e.target.value);
  }

  const onChangingCard = (e: ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target.value)
  }

  const onTimer = (e: ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target.value)
  }

  const onMinutes = (e: ChangeEvent<HTMLInputElement>): void => {
    setMinutes(e.target.value);
  }

  const onSeconds = (e: ChangeEvent<HTMLInputElement>): void => {
    setSeconds(e.target.value);
  }

  return (
    <div style={{ width: '100%' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Game Settings:
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="subtitle1" align="left" gutterBottom className={classes.settingsLabel}>
            Changing card in round end:
          </Typography>
          <Typography variant="subtitle1" align="left" gutterBottom className={classes.settingsLabel}>
            Is timer needed:
          </Typography>
          <Typography variant="subtitle1" align="left" gutterBottom className={classes.settingsLabel}>
            Score type:
          </Typography>
          <Typography variant="subtitle1" align="left" gutterBottom className={classes.settingsLabel}>
            Score type (Short):
          </Typography>
          <Typography variant="subtitle1" align="left" gutterBottom className={classes.settingsLabel}>
            Round time:
          </Typography>
        </Grid>
        <Grid container item xs={6} justifyContent="center">
          <Grid item xs={12}>
            <Switch color="primary" value="chargingCard" onChange={onChangingCard} />
          </Grid>
          <Grid item xs={12}>
            <Switch color="primary" value="timer" onChange={onTimer} />
          </Grid>
          <Grid item xs={12}>
            <TextField placeholder='story point' value={fullScoreType} onChange={onFullScoreType} />
          </Grid>
          <Grid item xs={12}>
            <TextField placeholder='SP' value={shortScoreType} onChange={onChangeFullScoreType} />
          </Grid>
          <Grid container item xs={12}>
            <TextField type="number" label="minutes" placeholder='2' className={classes.timerInput} value={minutes} onChange={onMinutes} />
            <TextField type="number" label="seconds" placeholder='20' className={classes.timerInputRigth} value={seconds} onChange={onSeconds} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default GameSettings;