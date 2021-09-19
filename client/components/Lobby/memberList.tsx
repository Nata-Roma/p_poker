import { Grid, Typography } from '@material-ui/core';
import useStylesMemberList from '@styles/memberList.style';
import { UserCard } from 'components/Cards/userCard';
import { FC } from 'react';
import { roles } from 'utils/configs';
import { IUser } from 'utils/interfaces';

interface MemberListProps {
  users: Array<IUser>;
  from?: string;
  onKickUser: (user: IUser) => void;
}

export const MemberList: FC<MemberListProps> = ({ users, onKickUser }) => {
  const classes = useStylesMemberList();
  const isMember = users && users
    .filter((user) => !user.dealer)
    .some((user) => user.userRole === roles.member);

  return (
    <div className={classes.container}>
      {isMember ? (
        <Typography variant="h5" gutterBottom className={classes.title}>
          Members:
        </Typography>
      ) : null}
      <Grid container spacing={2} className={classes.root}>
        {users &&
          users.map(
            (user) =>
              !user.dealer &&
              user.userRole === roles.member && (
                <Grid item key={user.username}>
                  <UserCard
                    user={user}
                    observer={false}
                    onKickUser={onKickUser}
                  />
                </Grid>
              ),
          )}
      </Grid>
    </div>
  );
};
