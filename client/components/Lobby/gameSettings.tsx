import { Typography, Grid, TextField, Switch } from '@material-ui/core';
import { useStylesSettingsGame } from '@styles/settings.style';
import React, { FC, useEffect, useState } from 'react';
import { cardDecks, gameSelectOptions, sequences } from 'utils/configs';
import { IGameTimer } from 'utils/interfaces';
import { GameSelect } from './gameSelect';

interface GameSettingsProps {
  onTimerChange: (timer: boolean) => void;
  onTimeChange: (timerData: string, dimension: string) => void;
  onSelectClick: (option: string, selectName: string) => void;
  timer: IGameTimer;
  onCardTurn: (cardChange: boolean) => void;
  isCardChange: boolean;
}

const GameSettings: FC<GameSettingsProps> = ({
  onTimerChange,
  onTimeChange,
  onSelectClick,
  timer,
  onCardTurn,
  isCardChange,
}) => {
  const classes = useStylesSettingsGame();
  const [ optionsArr, setOptionsArr ] = useState<Array<string>>();
  const [ cardDeckArr, setCardDeckArr ] = useState<Array<string>>();

  const onTimerClick = (timerSwitch: string) => {
    onTimerChange(timerSwitch ? true : false);
  };

  const onChangingCardClick = (cardChangeSwitch: string): void => {
    onCardTurn(cardChangeSwitch ? true : false);
  };

  useEffect(() => {
    const optArr = sequences.map((seq) => seq.name);
    setOptionsArr(optArr);
    const deckArr = cardDecks.map(deck => deck.name);
    setCardDeckArr(deckArr);

  }, []);

  return (
    <div style={{ width: '100%' }}>
      <Typography variant="h5" align="center" gutterBottom className={classes.title}>
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
              Auto complete vote:
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
              Automatically let in all new participants if the game has already started:
            </Typography>
          </Grid>
          <Grid item xl={6} xs={6}>
            <Switch
              color="primary"
              // value={}
              onChange={(e) => console.log(e)}
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
            {cardDeckArr && (
              <GameSelect
                selectName={gameSelectOptions.cardDeck}
                options={cardDeckArr}
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
              error={timer.minutes > 3 ? true : false}
              helperText={timer.minutes > 3 ? "Enter 3 or less" : ''} 
              type="number"
              label="minutes"
              className={classes.timerInput}
              name="minutes"
              value={timer.minutes}
              disabled={!timer.isTimer}
              onChange={(e) => onTimeChange(e.target.value, e.target.name)}
            />
            <TextField
              error={timer.minutes === 0 && timer.seconds < 10 ? true : false}
              helperText={timer.minutes === 0 && timer.seconds < 10 ? "Enter 10 or more" : ''} 
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
