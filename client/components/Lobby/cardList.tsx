import { Grid, Typography } from '@material-ui/core';
import { GameCard } from 'Cards/gameCard';
import { FC, useEffect, useState } from 'react';
import { cardDecks, sequences } from 'utils/configs';

interface CardListProps {
  cardDeck: Array<string>;
  sequence: Array<number>;
  onAddCard: () => void
  cardPot: string
}

export const CardList: FC<CardListProps> = ({ cardDeck, sequence, onAddCard, cardPot }) => {
  return (
    <>
      <Typography variant="subtitle1">Add card</Typography>
      <Grid container>
      <GameCard cardImg={cardPot} cardNumber={999} />
        {cardDeck &&
          sequence &&
          cardDeck.map((deck, i) => (
            <Grid item>
              <GameCard cardImg={deck} cardNumber={sequence[i]} key={deck} />
            </Grid>
          ))}
          <GameCard cardImg={''} cardNumber={null} empty={true} onAddCard={onAddCard} />
      </Grid>
    </>
  );
};
