import { IUserCreate } from './interfaces';

export const userCreate = (
  id: string,
  username: string,
  userSurname: string,
  avatar: string,
  userId: string,
  userRole: string,
  dealer:boolean
): IUserCreate => {
  return {
    roomId: id,
    user: {
      username,
      userSurname,
      avatar: avatar,
      id: userId,
      userRole,
      dealer
    },
  };
};
