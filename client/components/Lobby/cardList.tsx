import { Grid, Typography } from '@material-ui/core';
import { GameCard } from 'Cards/gameCard';
import { FC, useEffect, useState } from 'react';

interface CardListProps {
  cardDeck: Array<string>;
  sequence: Array<number>;
  onAddCard: () => void
  cardPot: string;
  onRemoveCard: () => void;  
}


export const CardList: FC<CardListProps> = ({ cardDeck, sequence, onAddCard, cardPot, onRemoveCard }) => {
  return (
    <>
      <Typography variant="subtitle1">Add card</Typography>
      <Grid container>
      <GameCard cardImg={cardPot} cardNumber={999} />
        {cardDeck &&
          sequence &&
          cardDeck.map((deck, i) => (
            <Grid item key={deck} >
              <GameCard cardImg={deck} cardNumber={sequence[i]} />
            </Grid>
          ))}
          <GameCard cardImg={''} cardNumber={null} key={'null'} empty={true} onAddCard={onAddCard} onRemoveCard={onRemoveCard} deckLength={cardDeck && cardDeck.length}/>
      </Grid>
    </>
  );
};
