import { Grid, Typography } from "@material-ui/core";
import useStylesMemberList from "@styles/memberList.style";
import { UserCard } from "Cards/userCard";
import { FC } from "react";
import { roles } from "utils/configs";
import { IUser, ObserverListProps } from "utils/interfaces";

export const ObserverList: FC<ObserverListProps> = ({ users, onRemoveUser }) => {

  const onRemoveUserFromObservers = (user: IUser) => {
    onRemoveUser(user);
  }

  const classes = useStylesMemberList();
  const isObserver = users.some((user) => user.userRole === roles.observer);
  return (
    <div className={classes.container}>
      {isObserver ? (
        <Typography variant="h4" align="center" gutterBottom>
          Observers:
        </Typography>
      ) : null}
      <Grid container spacing={2} className={classes.root}>
        {users &&
          users.map(
            (user) =>
              !user.dealer &&
              user.userRole === roles.observer && (
                <Grid item key={user.username}>
                  <UserCard user={user} observer={true} onRemoveUser={onRemoveUserFromObservers}/>
                </Grid>
              )
          )}
      </Grid>
    </div>
  );
};
