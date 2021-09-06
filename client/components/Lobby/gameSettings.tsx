import { Typography, Grid, TextField, Switch } from '@material-ui/core';
import { useStylesSettingsGame } from '@styles/settings.style';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { cardDecks, gameSelectOptions, sequences } from 'utils/configs';
import { IGameTimer } from 'utils/interfaces';
import { GameSelect } from './gameSelect';

interface GameSettingsProps {
  onTimerChange: (timer: boolean) => void;
  onTimeChange: (timerData: string, dimension: string) => void;
  onSelectClick: (option: string, selectName: string) => void;
  timer: IGameTimer;
  onCardChange: (cardChange: boolean) => void;
  isCardChange: boolean;
}

const GameSettings: FC<GameSettingsProps> = ({
  onTimerChange,
  onTimeChange,
  onSelectClick,
  timer,
  onCardChange,
  isCardChange,
}) => {
  const classes = useStylesSettingsGame();
  const [ optionsArr, setOptionsArr ] = useState<Array<string>>();

  const onTimerClick = (timerSwitch: string) => {
    onTimerChange(timerSwitch ? true : false);
  };

  const onChangingCardClick = (cardChangeSwitch: string): void => {
    onCardChange(cardChangeSwitch ? true : false);
  };

  useEffect(() => {
    const optArr = sequences.map((seq) => seq.name);
    setOptionsArr(optArr);
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Game Settings:
      </Typography>
      <Grid container spacing={2}>
        <Grid item container spacing={2}>
          <Grid item xl={6} xs={6}>
            <Typography
              variant="subtitle1"
              align="left"
              gutterBottom
              className={classes.settingsLabel}
            >
              Changing card in round end:
            </Typography>
          </Grid>
          <Grid item xl={6} xs={6}>
            <Switch
              color="primary"
              value={isCardChange ? '' : 'cardChange'}
              onChange={(e) => onChangingCardClick(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xl={6} xs={6}>
            <Typography
              variant="subtitle1"
              align="left"
              gutterBottom
              className={classes.settingsLabel}
            >
              Is timer needed:
            </Typography>
          </Grid>
          <Grid item xl={6} xs={6}>
            <Switch
              color="primary"
              value={timer.isTimer ? '' : 'timer'}
              onChange={(e) => onTimerClick(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xl={6} xs={6}>
            <Typography
              variant="subtitle1"
              align="left"
              gutterBottom
              className={classes.settingsLabel}
            >
              Number Sequence:
            </Typography>
          </Grid>
          <Grid item xl={6} xs={6}>
            {optionsArr && (
              <GameSelect
                selectName={gameSelectOptions.sequence}
                options={optionsArr}
                onSelectClick={onSelectClick}
              />
            )}
          </Grid>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xl={6} xs={6}>
            <Typography
              variant="subtitle1"
              align="left"
              gutterBottom
              className={classes.settingsLabel}
            >
              Deck type:
            </Typography>
          </Grid>
          <Grid item xl={6} xs={6}>
            {cardDecks && (
              <GameSelect
                selectName={gameSelectOptions.cardDeck}
                options={cardDecks}
                onSelectClick={onSelectClick}
              />
            )}
          </Grid>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xl={6} xs={6}>
            <Typography
              variant="subtitle1"
              align="left"
              gutterBottom
              className={classes.settingsLabel}
            >
              Round time:
            </Typography>
          </Grid>
          <Grid container item xl={6} xs={6}>
            <TextField
              type="number"
              label="minutes"
              className={classes.timerInput}
              name="minutes"
              value={timer.minutes}
              disabled={!timer.isTimer}
              onChange={(e) => onTimeChange(e.target.value, e.target.name)}
            />
            <TextField
              type="number"
              label="seconds"
              className={classes.timerInputRigth}
              name="seconds"
              value={timer.seconds}
              disabled={!timer.isTimer}
              onChange={(e) => onTimeChange(e.target.value, e.target.name)}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default GameSettings;
