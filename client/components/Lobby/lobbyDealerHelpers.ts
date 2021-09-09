import { cardDecks, sequences } from 'utils/configs';
import { IGameSettings, IssueData, issuePrevNext } from 'utils/interfaces';

export const issueCreate = (
  state: IGameSettings,
  issue: IssueData,
): IGameSettings => {
  const issues = [ ...state.issues ];
  issues.push({
    issueName: issue.issueName,
    priority: issue.priority,
  });
  return {
    ...state,
    issues: issues,
  };
};

export const issueDelete = (
  state: IGameSettings,
  issue: string,
): IGameSettings => {
  const issues = state.issues.filter(
    (issueItem) => issueItem.issueName !== issue,
  );
  return {
    ...state,
    issues: issues,
  };
};

export const issueChangeEdit = (
  state: IGameSettings,
  changedIssue: issuePrevNext,
): IGameSettings => {
  const filteredIssues = state.issues.filter(
    (issue) => issue.issueName !== changedIssue.prevValue,
  );
  filteredIssues.push({
    issueName: changedIssue.nextValue,
    priority: changedIssue.priority,
  });
  return {
    ...state,
    issues: filteredIssues,
  };
};

export const timerChange = (
  state: IGameSettings,
  isTimer: boolean,
): IGameSettings => {
  const timer = { ...state.timer };
  if (isTimer) {
    timer.isTimer = true;
  } else {
    timer.isTimer = false;
    timer.minutes = 0;
    timer.seconds = 0;
  }
  return {
    ...state,
    timer: timer,
  };
};

export const timeChange = (
  state: IGameSettings,
  timerData: string,
  dimension: string,
): IGameSettings => {
  const timer = { ...state.timer };
  if (timer.isTimer) {
    timer[dimension] = +timerData;
  }
  return {
    ...state,
    timer: timer,
  };
};

export const selectCard = (
  state: IGameSettings,
  choice: string,
  selectName: string,
): IGameSettings => {
  const card = { ...state.card };
  card[selectName] = choice;

  return {
    ...state,
    card: card,
  };
};

export const selectCardSequence = (
  cardNumber: number,
  choice: string,
): Array<number> => {
  let chosenSeq = [] as Array<number>;

  const seq = sequences.filter((item) => item.name === choice);
  if (seq.length) {
    chosenSeq = Array.from(
      { length: cardNumber },
      (_, i) => seq[0].sequence[i],
    );
  }
  return chosenSeq;
};

export const selectCardDeck = (
  cardNumber: number,
  choice: string,
): Array<string> => {
  let chosenDeck = [] as Array<string>;

  const deck = cardDecks.filter((item) => item.name === choice);

  if (deck.length) {
    chosenDeck = Array.from({ length: cardNumber }, (_, i) => deck[0].deck[i]);
  }

  return chosenDeck;
};
