import { IUserCreate } from './interfaces';

export const userCreate = (
  id: string,
  username: string,
  userSurname: string,
  userId: string,
): IUserCreate => {
  return {
    roomId: id,
    user: {
      username,
      userSurname,
      avatar: '',
      id: userId,
    },
  };
};
