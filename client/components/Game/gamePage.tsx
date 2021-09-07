import { Grid } from '@material-ui/core';
import useStylesGame from '@styles/game.style';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { apiGetLobbyInfo, apiStartGame } from 'services/apiServices';
import AppContext from 'store/store';
import { IGameIssue, IUser } from 'utils/interfaces';
import { GameCard } from '../../Cards/gameCard';
import { ScoreList } from './scoreList';
import { cardDecks, roles, sequences } from 'utils/configs';
import { GameDealer } from './gameDealer';
import { GamePlayer } from './gamePlayer';

export const GamePage = () => {
  const classes = useStylesGame();
  const [ users, setUsers ] = useState<Array<IUser>>();
  const { state } = useContext(AppContext);
  const router = useRouter();
  const { lobby } = router.query;
  const [ gameIssues, setGameIssues ] = useState<Array<IGameIssue>>();
  const [ chosenDeck, setChosenDeck ] = useState<Array<string>>();
  const [ chosenSeq, setChosenSeq ] = useState<Array<number>>();
  const [ cardPot, setCardPot ] = useState('');
  const [ dealer, setDealer ] = useState<IUser>();

  const initData = async () => {
    const data = await apiGetLobbyInfo(lobby);
    if (data.users) {
      setUsers(data.users);
    }

    const dealer = data.users.find((user) => user.dealer);
    setDealer(dealer);
    console.log('gameDealer', dealer.username);

    const gameData = await apiStartGame(lobby);
    setGameIssues(gameData.issues);

    const seq = gameData.card.sequence;
    const currentSeq = sequences.find((item) => item.name === seq);
    if (currentSeq) {
      setChosenSeq(
        Array.from(
          { length: gameData.card.cardNumber },
          (_, i) => currentSeq.sequence[i],
        ),
      );
    }

    const deck = gameData.card.cardDeck;
    const currentDeck = cardDecks.find((item) => item.name === deck);
    if (currentDeck) {
      setChosenDeck(
        Array.from(
          { length: gameData.card.cardNumber },
          (_, i) => currentDeck.deck[i],
        ),
      );
      setCardPot(currentDeck.deck[currentDeck.deck.length - 1]);
    }
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    // <div className={classes.container}>
    <Grid container className={classes.container}>
      <Grid
        container
        direction="column"
        item
        xl={9}
        md={8}
        sm={7}
        xs={12}
        className={classes.gamePartContainer}
      >
        {state.dealer &&
        gameIssues && <GameDealer dealer={dealer} gameIssues={gameIssues} />}
        {!state.dealer &&
        gameIssues && <GamePlayer dealer={dealer} gameIssues={gameIssues} />}
        <Grid container item>
          {state.userRole === roles.member &&
            chosenDeck &&
            chosenSeq &&
            chosenDeck.map((card, i) => (
              <GameCard
                key={card}
                cardImg={card}
                cardNumber={chosenSeq[i]}
                game={true}
              />
            ))}
          {state.userRole === roles.member &&
          cardPot && (
            <GameCard cardImg={cardPot} cardNumber={999} game={true} />
          )}
        </Grid>
      </Grid>
      <Grid
        item
        container
        xl={3}
        md={4}
        sm={5}
        xs={4}
        className={classes.scorePartContainer}
      >
        {users && <ScoreList users={users} />}
      </Grid>
    </Grid>
    // </div>
  );
};
