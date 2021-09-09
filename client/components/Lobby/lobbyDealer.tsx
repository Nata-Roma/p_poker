import { useRouter } from 'next/router';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Button, Typography, Grid } from '@material-ui/core';

import useStylesLobbyPart from '@styles/lobbyPart.style';
import { MemberList } from 'components/Lobby/memberList';
import { UserCard } from 'Cards/userCard';
import NameGame from './nameGame';
import GameSettings from './gameSettings';
import IssueList from './issueList';
import AppContext, { appStore } from 'store/store';
import {
  IGameSettings,
  IssueData,
  issuePrevNext,
  IUser,
} from 'utils/interfaces';
import { ObserverList } from './observerList';
import {
  cardDecks,
  initGameSettings,
  maxCardNumber,
  minCardNumber,
  roles,
  sequences,
} from 'utils/configs';
import { CardList } from './cardList';
import { apiCreateGame } from 'services/apiServices';
import KickPlayerPopup from './kickPlayerPopup';

export interface LobbyDealerProps {
  users: Array<IUser>;
}

export const LobbyDealer: FC<LobbyDealerProps> = ({ users }) => {
  const classes = useStylesLobbyPart();
  const { state } = useContext(AppContext);
  const router = useRouter();
  const { lobby } = router.query;
  const [ dealer, setDealer ] = useState<IUser>();
  const [ isOpenKickUser, setIsOpenKickUser ] = useState(false);
  const [ gameSettings, setGameSettings ] = useState<IGameSettings>(
    initGameSettings,
  );
  const [ chosenDeck, setChosenDeck ] = useState<Array<string>>();
  const [ chosenSeq, setChosenSeq ] = useState<Array<number>>();
  const [ cardPot, setCardPot ] = useState('');
  const [kickOffUser, setKickOffUser] = useState<IUser>();

  const onStartGameClick = async () => {
    console.log(gameSettings);
    if (
      !gameSettings.issues.length ||
      !gameSettings.card.cardNumber ||
      (gameSettings.timer.isTimer &&
        (!gameSettings.timer.minutes || !gameSettings.timer.seconds))
    )
      return null;
    const create = await apiCreateGame(lobby, gameSettings);
    setGameSettings(initGameSettings);
    console.log(create);
    state.socket.emit('startGame', { roomId: lobby });
    router.push(`/${lobby}/game`);
  };

  const onIssueCreate = (issue: IssueData) => {
    setGameSettings((prev) => {
      const issues = [ ...prev.issues ];
      issues.push({
        issueName: issue.issueName,
        priority: issue.priority,
      });
      return {
        ...prev,
        issues: issues,
      };
    });
  };

  const onIssueDelete = (issue: string) => {
    setGameSettings((prev) => {
      const issues = prev.issues.filter(
        (issueItem) => issueItem.issueName !== issue,
      );
      return {
        ...prev,
        issues: issues,
      };
    });
  };

  const onIssueChangeEdit = (changedIssue: issuePrevNext) => {
    setGameSettings((prev) => {
      const filteredIssues = prev.issues.filter(
        (issue) => issue.issueName !== changedIssue.prevValue,
      );
      filteredIssues.push({
        issueName: changedIssue.nextValue,
        priority: changedIssue.priority,
      });
      return {
        ...prev,
        issues: filteredIssues,
      };
    });
  };

  const onTimerChange = (isTimer: boolean) => {
    setGameSettings((prev) => {
      const timer = { ...prev.timer };
      if (isTimer) {
        timer.isTimer = true;
      } else {
        timer.isTimer = false;
        timer.minutes = 0;
        timer.seconds = 0;
      }
      return {
        ...prev,
        timer: timer,
      };
    });
  };

  const onTimeChange = (timerData: string, dimension: string) => {
    setGameSettings((prev) => {
      const timer = { ...prev.timer };
      if (timer.isTimer) {
        timer[dimension] = +timerData;
      }
      return {
        ...prev,
        timer: timer,
      };
    });
  };

  const onSelectClick = (choice: string, selectName: string) => {
    setGameSettings((prev) => {
      const card = { ...prev.card };
      card[selectName] = choice;
      return {
        ...prev,
        card: card,
      };
    });

    const seq = sequences.filter((item) => item.name === choice);
    if (seq.length) {
      setChosenSeq(
        Array.from(
          { length: gameSettings.card.cardNumber },
          (_, i) => seq[0].sequence[i],
        ),
      );
    }

    const deck = cardDecks.filter((item) => item.name === choice);

    if (deck.length) {
      setChosenDeck(
        Array.from(
          { length: gameSettings.card.cardNumber },
          (_, i) => deck[0].deck[i],
        ),
      );
    }
  };

  const onCardTurn = (isChange: boolean) => {
    setGameSettings((prev) => {
      const card = { ...prev.card };
      if (isChange) {
        card.cardTurn = true;
      } else {
        card.cardTurn = true;
      }
      return {
        ...prev,
        card: card,
      };
    });
  };

  const onAddCard = () => {
    setGameSettings((prev) => {
      const card = { ...prev.card };
      if (card.cardNumber < maxCardNumber) {
        card.cardNumber++;
      }
      return { ...prev, card: card };
    });
  };

  const onRemoveCard = () => {
    setGameSettings((prev) => {
      const card = { ...prev.card };
      if (card.cardNumber > minCardNumber) {
        card.cardNumber--;
      }
      return { ...prev, card: card };
    });
  };

  const onRoomLeave = () => {
    state.socket.emit('leaveGame', {
      roomId: lobby,
      userId: state.userId,
    });
  };

  const onDeleteUser = (user: IUser) => {
    state.socket.emit('kickPlayerFromLobby', {
      roomId: lobby,
      userId: user.id,
    });
  }

  const gameFinish = (message: string) => {
    console.log('gameOver', message);
    state.socket.emit('gameOverFinish', { roomId: lobby });
    router.push('/');
  };

  useEffect(() => {
    state.socket.on('gameOver', (message) => {
      gameFinish(message);
    });
    return () => {
      state.socket.off('gameOver', (message) => {
        gameFinish(message);
      });
    };
  }, []);

  useEffect(
    () => {
      const dealer = users?.find((user) => user.dealer);
      setDealer(dealer);
    },
    [ users ],
  );
  useEffect(
    () => {
      setChosenSeq(
        Array.from(
          { length: gameSettings.card.cardNumber },
          (_, i) => sequences[0].sequence[i],
        ),
      );

      setChosenDeck(
        Array.from(
          { length: gameSettings.card.cardNumber },
          (_, i) => cardDecks[0].deck[i],
        ),
      );
    },
    [ gameSettings.card.cardNumber ],
  );

  useEffect(
    () => {
      const deckName = initGameSettings.card.cardDeck;
      const deck = cardDecks.find((item) => item.name === deckName).deck;
      if (deck) {
        setCardPot(deck[deck.length - 1]);
      }
    },
    [ chosenDeck ],
  );

  const onKickUser = (user: IUser) => {
    setIsOpenKickUser(true);
    setKickOffUser(user)
  };

  return (
    <Grid
      container
      direction="column"
      item
      xs={12}
      md={9}
      sm={7}
      className={classes.lobbyPartDealerContainer}
      wrap="nowrap"
    >
      <Grid item>
        <Typography variant="h4" align="center" gutterBottom>
          Lobby
        </Typography>
      </Grid>
      <NameGame />
      <Grid item className={classes.mBottom}>
        <Typography variant="subtitle2">Dealer:</Typography>
        {dealer && (
          <UserCard
            user={dealer}
            observer={dealer.userRole === roles.observer ? true : false}
            onKickUser={onKickUser}
          />
        )}
      </Grid>
      <Grid
        item
        container
        justifyContent="space-between"
        className={classes.mBottom}
      >
        <Button
          color="primary"
          variant="contained"
          className={classes.btn}
          onClick={onStartGameClick}
        >
          Start Game
        </Button>
        <Button
          variant="outlined"
          className={classes.btn}
          onClick={onRoomLeave}
        >
          Cancel Game
        </Button>
      </Grid>
      <Grid item container>
        {users && <MemberList users={users} onKickUser={onKickUser} />}
      </Grid>
      <Grid item container>
        {users && (
          <ObserverList users={users} onKickUser={onKickUser} />
        )}
      </Grid>
      <Grid item container>
        <IssueList
          onIssueCreate={onIssueCreate}
          onIssueDelete={onIssueDelete}
          onIssueChangeEdit={onIssueChangeEdit}
          issues={gameSettings.issues}
        />
        <GameSettings
          onTimerChange={onTimerChange}
          onTimeChange={onTimeChange}
          timer={gameSettings.timer}
          onSelectClick={onSelectClick}
          onCardTurn={onCardTurn}
          isCardChange={gameSettings.card.cardTurn}
        />
      </Grid>
      <Grid item container>
        <CardList
          cardDeck={chosenDeck}
          sequence={chosenSeq}
          onAddCard={onAddCard}
          onRemoveCard={onRemoveCard}
          cardPot={cardPot}
        />
      </Grid>
      <KickPlayerPopup
        isOpenKickUser={isOpenKickUser}
        onClosePopUp={(isOpen: boolean) => setIsOpenKickUser(isOpen)}
        user={kickOffUser}
        onDeleteUser={onDeleteUser}
      />
    </Grid>
  );
};
