import { useRouter } from 'next/router';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Button, Typography, Grid } from '@material-ui/core';

import useStylesLobbyPart from '@styles/lobbyPart.style';
import { MemberList } from 'components/Lobby/memberList';
import { UserCard } from 'components/Cards/userCard';
import NameGame from './nameGame';
import GameSettings from './gameSettings';
import IssueList from './issueList';
import AppContext from 'store/store';
import { IGameIssue, IGameSettings, IssueData, IUser } from 'utils/interfaces';
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
import KickPlayerPopup from './popups/kickPlayerPopup';
import {
  issueChanged,
  issueCreate,
  selectCard,
  selectCardDeck,
  selectCardSequence,
  timeChange,
  timerChange,
  autoJoinChange
} from './lobbyDealerHelpers';
import { DealerLeavePage } from 'components/Game/Popups/dealerLeavePage';

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
  const [ kickOffUser, setKickOffUser ] = useState<IUser>();
  const [ gameSettings, setGameSettings ] = useState<IGameSettings>(
    initGameSettings,
  );
  const [ chosenDeck, setChosenDeck ] = useState<Array<string>>();
  const [ chosenSeq, setChosenSeq ] = useState<Array<number>>();
  const [ cardPot, setCardPot ] = useState('');
  const [ isLeaveOpen, setIsLeaveOpen ] = useState(false);

  const onStartGameClick = async () => {
    console.log(gameSettings);
    if (
      !gameSettings.issues.length ||
      !gameSettings.card.cardNumber ||
      (gameSettings.timer.isTimer &&
        // (!gameSettings.timer.minutes && !gameSettings.timer.seconds))
        !gameSettings.timer.time)
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
      return issueCreate(prev, issue);
    });
  };

  const onIssueDelete = (newIssues: Array<IGameIssue>) => {
    setGameSettings((prev) => {
      return issueChanged(prev, newIssues);
    });
  };

  const onIssueEdit = (newIssues: Array<IGameIssue>) => {
    setGameSettings((prev) => {
      return issueChanged(prev, newIssues);
    });
  };

  const onTimerChange = (isTimer: boolean) => {
    setGameSettings((prev) => {
      return timerChange(prev, isTimer);
    });
  };

  const onTimeChange = (timerData: string, dimension: string) => {
    setGameSettings((prev) => {
      return timeChange(prev, timerData, dimension);
    });
  };

  const onSelectClick = (choice: string, selectName: string) => {
    setGameSettings((prev) => {
      return selectCard(prev, choice, selectName);
    });

    const cardSequence = selectCardSequence(
      gameSettings.card.cardNumber,
      choice,
    );
    if (cardSequence && cardSequence.length) {
      setChosenSeq(cardSequence);
    }

    const cardDeck = selectCardDeck(gameSettings.card.cardNumber, choice);
    if (cardDeck && cardDeck.length) {
      setChosenDeck(cardDeck);
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

      const cardSequence = selectCardSequence(card.cardNumber, card.sequence);
      if (cardSequence && cardSequence.length) {
        setChosenSeq(cardSequence);
      }

      const cardDeck = selectCardDeck(card.cardNumber, card.cardDeck);
      if (cardDeck && cardDeck.length) {
        setChosenDeck(cardDeck);
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

      const cardSequence = selectCardSequence(card.cardNumber, card.sequence);
      if (cardSequence && cardSequence.length) {
        setChosenSeq(cardSequence);
      }

      const cardDeck = selectCardDeck(card.cardNumber, card.cardDeck);
      if (cardDeck && cardDeck.length) {
        setChosenDeck(cardDeck);
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

  const onKickUser = (user: IUser) => {
    setIsOpenKickUser(true);
    setKickOffUser(user);
  };

  const onDeleteUser = (user: IUser) => {
    state.socket.emit('kickPlayerFromLobby', {
      roomId: lobby,
      userId: user.id,
    });
  };

  const onAutoJoinChange = (isAutoJoin: boolean) => {
    setGameSettings((prev) => {
      return autoJoinChange(prev, isAutoJoin);
    });
  };

  const gameFinish = (message: string) => {
    state.socket.emit('gameOverFinish', { roomId: lobby });
    router.push('/');
  };

  useEffect(
    () => {
      const dealer = users?.find((user) => user.dealer);
      setDealer(dealer);
    },
    [ users ],
  );
  useEffect(() => {
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
      const deckName = initGameSettings.card.cardDeck;
      const deck = cardDecks.find((item) => item.name === deckName).deck;
      if (deck) {
        setCardPot(deck[deck.length - 1]);
      }
    },
    [ chosenDeck ],
  );

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
          onClick={() => setIsLeaveOpen(true)}
        >
          Cancel Game
        </Button>
      </Grid>
      <Grid item container>
        {users && <MemberList users={users} onKickUser={onKickUser} />}
      </Grid>
      <Grid item container>
        {users && <ObserverList users={users} onKickUser={onKickUser} />}
      </Grid>
      <Grid item container>
        <IssueList
          onIssueCreate={onIssueCreate}
          onIssueDelete={onIssueDelete}
          onIssueEdit={onIssueEdit}
          issues={gameSettings.issues}
        />
        <GameSettings
          onTimerChange={onTimerChange}
          onTimeChange={onTimeChange}
          timer={gameSettings.timer}
          onSelectClick={onSelectClick}
          onCardTurn={onCardTurn}
          isCardChange={gameSettings.card.cardTurn}
          onAutoJoinChange={onAutoJoinChange}
          isAutoJoin={gameSettings.isAutoJoin}
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
      <DealerLeavePage
        isOpen={isLeaveOpen}
        onLeaveClose={() => setIsLeaveOpen(false)}
        onLeaveConfirm={onRoomLeave}
      />
    </Grid>
  );
};
