import { Typography, Grid, TextField, Switch } from '@material-ui/core';
import { useStylesSettingsGame } from '@styles/settings.style';
import { ChangeEvent, FC, useState } from 'react';
import { IGameTimer } from 'utils/interfaces';

interface GameSettingsProps {
  onTimerChange: (timer: boolean) => void;
  onTimeChange: (timerData: string, dimension: string) => void;
  timer: IGameTimer;
}

const GameSettings: FC<GameSettingsProps> = ({
  onTimerChange,
  onTimeChange,
  timer,
}) => {
  const classes = useStylesSettingsGame();
  const [ fullScoreType, setFullScoreType ] = useState('');
  const [ shortScoreType, setShortScoreType ] = useState('');

  const onFullScoreType = (e: ChangeEvent<HTMLInputElement>): void => {
    setFullScoreType(e.target.value);
  };

  const onChangeFullScoreType = (e: ChangeEvent<HTMLInputElement>): void => {
    setShortScoreType(e.target.value);
  };

  const onTimerClick = (timerSwitch: string) => {
    onTimerChange(timerSwitch ? true : false);
  };

  const onChangingCard = (e: ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target.value);
  };

  return (
    <div style={{ width: '100%' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Game Settings:
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography
            variant="subtitle1"
            align="left"
            gutterBottom
            className={classes.settingsLabel}
          >
            Changing card in round end:
          </Typography>
          <Typography
            variant="subtitle1"
            align="left"
            gutterBottom
            className={classes.settingsLabel}
          >
            Is timer needed:
          </Typography>
          <Typography
            variant="subtitle1"
            align="left"
            gutterBottom
            className={classes.settingsLabel}
          >
            Score type:
          </Typography>
          <Typography
            variant="subtitle1"
            align="left"
            gutterBottom
            className={classes.settingsLabel}
          >
            Score type (Short):
          </Typography>
          <Typography
            variant="subtitle1"
            align="left"
            gutterBottom
            className={classes.settingsLabel}
          >
            Round time:
          </Typography>
        </Grid>
        <Grid container item xs={6} justifyContent="center">
          <Grid item xs={12}>
            <Switch
              color="primary"
              value="chargingCard"
              onChange={onChangingCard}
            />
          </Grid>
          <Grid item xs={12}>
            <Switch
              color="primary"
              value={timer.isTimer ? '' : 'timer'}
              onChange={(e) => onTimerClick(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              placeholder="story point"
              value={fullScoreType}
              onChange={onFullScoreType}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              placeholder="SP"
              value={shortScoreType}
              onChange={onChangeFullScoreType}
            />
          </Grid>
          <Grid container item xs={12}>
            <TextField
              type="number"
              label="minutes"
              className={classes.timerInput}
              name="minutes"
              value={timer.minutes}
              onChange={(e) => onTimeChange(e.target.value, e.target.name)}
            />
            <TextField
              type="number"
              label="seconds"
              className={classes.timerInputRigth}
              name="seconds"
              value={timer.seconds}
              onChange={(e) => onTimeChange(e.target.value, e.target.name)}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default GameSettings;
