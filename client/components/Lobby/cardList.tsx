import { Grid, Typography } from '@material-ui/core';
import { GameCard } from 'Cards/gameCard';
import { FC, useEffect, useState } from 'react';
import { cardDecks, sequences } from 'utils/configs';

interface CardListProps {
  cardDeck: Array<string>;
  sequence: Array<number>;
  onAddCard: () => void;
  onRemoveCard: () => void;
}

const LAST_CARD_INDEX = 3;

export const CardList: FC<CardListProps> = ({ cardDeck, sequence, onAddCard, onRemoveCard }) => {
  return (
    <>
      <Typography variant="subtitle1">Add card</Typography>
      <Grid container>
        {cardDeck &&
          sequence &&
          cardDeck.map((deck, i) => (
            <Grid item>
              {i !== LAST_CARD_INDEX
                ? <GameCard cardImg={deck} cardNumber={sequence[i]} key={deck} />
                  : <GameCard cardImg={''} cardNumber={666} key={deck} />
              }
            </Grid>
          ))}
          <GameCard cardImg={''} cardNumber={null} key={'null'} empty={true} onAddCard={onAddCard} onRemoveCard={onRemoveCard}/>
      </Grid>
    </>
  );
};
