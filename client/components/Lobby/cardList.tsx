import { Grid, Typography } from '@material-ui/core';
import { GameCard } from 'Cards/gameCard';
import { FC, useEffect, useState } from 'react';
import { cardDecks, sequences } from 'utils/configs';

interface CardListProps {
  cardDeck: Array<string>;
  sequence: Array<number>;
  onAddCard: () => void
}

export const CardList: FC<CardListProps> = ({ cardDeck, sequence, onAddCard }) => {
  return (
    <>
      <Typography variant="subtitle1">Add card</Typography>
      <Grid container>
        {cardDeck &&
          sequence &&
          cardDeck.map((deck, i) => (
            <Grid item>
              <GameCard cardImg={deck} cardNumber={sequence[i]} key={deck} />
            </Grid>
          ))}
          <GameCard cardImg={''} cardNumber={null} key={'null'} empty={true} onAddCard={onAddCard} />
      </Grid>
    </>
  );
};
