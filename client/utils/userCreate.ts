import { IUserCreate } from './interfaces';

export const userCreate = (
  id: string | Array<string>,
  username: string,
  userSurname: string,
  avatar: string,
  userId: string,
  userRole: string,
  dealer: boolean,
): IUserCreate => {
  if (typeof id === 'string') {
    return {
      roomId: id,
      user: {
        username,
        userSurname,
        avatar: avatar,
        id: userId,
        userRole,
        dealer,
      },
    };
  }
  return null;
};
