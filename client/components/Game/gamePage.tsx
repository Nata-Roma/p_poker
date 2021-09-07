import Link from 'next/link';
import { Button } from '@material-ui/core';
import { Typography, Grid } from '@material-ui/core';
import useStylesGame from '@styles/game.style';
import { Chat } from 'components/Chat/chat';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import {
  apiCreateGame,
  apiGetLobbyInfo,
  apiStartGame,
} from 'services/apiServices';
import AppContext from 'store/store';
import { IChatMessage, IGameIssue, IUser } from 'utils/interfaces';
import { GameDealer } from './gameDealer';
<<<<<<< HEAD
import { ScoreList } from './ScoreList';
import IssuesCards from './issuesCards';
=======
>>>>>>> aef353b15cd4e49e1b3c06f37e8b46a9a710c610
import { GameCard } from '../../Cards/gameCard';
import { ScoreList } from './scoreList';
import {
  cardDecks,
  fibonacci_Seq,
  gameCardSur,
  sequences,
} from 'utils/configs';

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

  console.log('state', state);
  console.log('router', router);
  // const issues = [ 1, 2, 3, 4, 5, 6 ];
  const springNum = 123;

  const initData = async () => {
    const data = await apiGetLobbyInfo(lobby);
    if (data.users) {
      setUsers(data.users);
    }

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
    <div className={classes.container}>
      <Grid container style={{ height: '100%', overflow: 'hidden' }}>
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
          <Grid>
            <Typography variant="h6" align="center" gutterBottom>
              Spring: {springNum} planning (issues: Issues)
            </Typography>
          </Grid>
          {users &&
          gameIssues && <GameDealer users={users} gameIssues={gameIssues} />}
          <Grid container>
            {chosenDeck &&
              chosenSeq &&
              chosenDeck.map((card, i) => (
                <GameCard key={card} cardImg={card} cardNumber={chosenSeq[i]} />
              ))}
            {cardPot && <GameCard cardImg={cardPot} cardNumber={999} />}
          </Grid>
        </Grid>
        <Grid
          item
          xl={3}
          md={4}
          sm={5}
          xs={4}
          className={classes.scorePartContainer}
        >
          {users && <ScoreList users={users} />}
        </Grid>
      </Grid>
    </div>
  );
};
