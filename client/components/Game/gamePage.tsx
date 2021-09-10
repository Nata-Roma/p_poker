import { Grid } from '@material-ui/core';
import useStylesGame from '@styles/game.style';
import { useRouter } from 'next/router';
import React, { FC, useContext, useEffect, useState } from 'react';
import { apiGetLobbyInfo, apiStartGame } from 'services/apiServices';
import AppContext from 'store/store';
import {
  IApiStartGame,
  IGamePageIssue,
  IStatistics,
  IUser,
} from 'utils/interfaces';
import { GameCard } from '../Cards/gameCard';
import { cardDecks, nonVoted, roles, sequences } from 'utils/configs';
import { GameDealer } from './gameDealer';
import { GamePlayer } from './gamePlayer';
import { ScoreList } from './scoreList';
import { ObserverList } from './observerList';

export interface IActiveIssue {
  issueName: string;
  score: number;
}

interface GamePageProps {
  gameData: IApiStartGame;
  userData: Array<IUser>;
}

export const GamePage: FC<GamePageProps> = ({ gameData, userData }) => {
  const classes = useStylesGame();
  const [ users, setUsers ] = useState<Array<IUser>>();
  const { state } = useContext(AppContext);
  const router = useRouter();
  const { lobby } = router.query;
  const [ gameIssues, setGameIssues ] = useState<Array<IGamePageIssue>>();
  const [ activeIssueName, setActiveIssueName ] = useState<string>();
  const [ chosenDeck, setChosenDeck ] = useState<Array<string>>();
  const [ chosenSeq, setChosenSeq ] = useState<Array<number>>();
  const [ cardPot, setCardPot ] = useState('');
  const [ activeCard, setActiveCard ] = useState<string>('');
  const [ dealer, setDealer ] = useState<IUser>();
  const [ springTitle, setSpringTitle ] = useState('');

  const onUserJoinLeave = (users: Array<IUser>) => {
    setUsers(users);
    console.log('Lobby Dealer join/left user');
  };

  const onIssueClick = (issueName: string) => {
    state.socket.emit('changeActiveIssue', { roomId: lobby, issueName });
  };

  const changeActiveIssue = (message: {
    issueName: string;
    gameIssues: Array<IGamePageIssue>;
  }) => {
    setActiveIssueName(message.issueName);
    setActiveCard('');
    setGameIssues(message.gameIssues);
  };

  const onGameCardClick = (cardName: string, cardNumber: number) => {
    setActiveCard(cardName);
    state.socket.emit('gameCardChoice', {
      roomId: lobby,
      playerChoice: {
        playerId: state.userId,
        playerChoice: cardNumber,
        issue: activeIssueName,
      },
    });
  };

  const initData = async () => {
    if (userData) {
      setUsers(userData);
    }
    const dealer = userData.find((user) => user.dealer);
    setDealer(dealer);

    setGameIssues(gameData.issues);
    setActiveIssueName(gameData.issues[0].issue.issueName);
    setSpringTitle(gameData.spring);

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

  const calculateIssueScore = () => {
    state.socket.emit('calcScore', {
      roomId: lobby,
      issueName: activeIssueName,
    });
  };

  const newIssueAdded = (newIssue: Array<IGamePageIssue>) => {
    setGameIssues(newIssue);
  };

  useEffect(() => {
    initData();
    state.socket.on('userJoined', (message) => {
      onUserJoinLeave(message);
    });

    state.socket.on('userLeft', (message) => {
      onUserJoinLeave(message);
    });

    state.socket.on('newGameIssue', (message) => {
      newIssueAdded(message);
    });

    return () => {
      state.socket.off('userJoined', (message) => {
        onUserJoinLeave(message);
      });

      state.socket.off('userLeft', (message) => {
        onUserJoinLeave(message);
      });

      state.socket.off('newGameIssue', (message) => {
        newIssueAdded(message);
      });
    };
  }, []);

  useEffect(() => {
    state.socket.on('activeIssueChanged', (message) => {
      changeActiveIssue(message);
    });

    return () =>
      state.socket.off('activeIssuechanged', (message) => {
        changeActiveIssue(message);
      });
  }, []);

  return (
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
        gameIssues && (
          <GameDealer
            dealer={dealer}
            gameIssues={gameIssues}
            onIssueClick={onIssueClick}
            activeIssueName={activeIssueName}
            calculateIssueScore={calculateIssueScore}
            springTitle={springTitle}
          />
        )}
        {!state.dealer &&
        gameIssues && (
          <GamePlayer
            dealer={dealer}
            gameIssues={gameIssues}
            activeIssueName={activeIssueName}
          />
        )}
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
                onGameCardClick={onGameCardClick}
                activeCard={activeCard}
              />
            ))}
          {state.userRole === roles.member &&
          cardPot && (
            <GameCard
              cardImg={cardPot}
              cardNumber={nonVoted}
              game={true}
              onGameCardClick={onGameCardClick}
              activeCard={activeCard}
            />
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
        {users && (
          <ScoreList
            users={users}
            issues={gameIssues}
            activeIssueName={activeIssueName}
          />
        )}
        {users && <ObserverList users={users} />}
      </Grid>
    </Grid>
  );
};
