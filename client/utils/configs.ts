import { IGameIssue } from './interfaces';

export const roles = {
  dealer: 'dealer',
  member: 'member',
  observer: 'observer',
};

export const errorInfo = {
  nameError: {
    ok: 'Correct',
    bad: 'Incorrect entry',
    validator: 3,
  },
  surnameError: {
    ok: 'Correct',
    bad: 'Incorrect entry',
    validator: 3,
  },
};

export const userInitData = {
  username: {
    nameData: '',
    statusData: false,
  },
  userSurname: {
    nameData: '',
    statusData: false,
  },
  avatar: '',
};

export const gameCardSur = [
  '/cards/card_1.png',
  '/cards/card_2.png',
  '/cards/card_3.png',
  '/cards/card_4.png',
  '/cards/card_5.png',
  '/cards/card_6.png',
];

export const fibonachi_Seq = [ 1, 2, 3, 5, 8, 13 ];

export const initGameSettings = {
  issues: [] as Array<IGameIssue>,
  timer: {
    isTimer: false,
    minutes: 0,
    seconds: 0,
  },
  card: {
    cardDeck: gameCardSur,
    sequenceType: '',
    cardNumber: 0,
    cardChangeAtEnd: false,
  },
};
