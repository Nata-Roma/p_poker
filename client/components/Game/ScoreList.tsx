import { Grid, Typography } from "@material-ui/core";
import useStylesScoreList from "@styles/scoreList.style";
import { UserCard } from "components/userCard";
import React, { FC } from "react";
import { roles } from "utils/configs";
import { IUser } from "utils/interfaces";
import { ScoreCard } from "./ScoreCard";

interface ScoreListProps {   
        users: Array<IUser>;
}     

export const ScoreList: FC<ScoreListProps> = ({ users }) => {
    const classes = useStylesScoreList();
  
    return (
      <div className={classes.container}>
        <Grid container item spacing={2} justifyContent="space-around" className={classes.heading}>
            <Typography variant="h6" align="center" gutterBottom>
                Scores:
            </Typography>
            <Typography variant="h6" align="center" gutterBottom>
                Members:
             </Typography>
        </Grid>
          {users &&
            users.map(
              (user) =>
                !user.dealer &&
                user.userRole === roles.member && (
                    <Grid container item  >
                    <Grid item xs={6} key={user.id}>  
                  
                    <ScoreCard user={user} />
                  </Grid>
                  <Grid item xs={6} key={user.id}>                 
                    <UserCard user={user} observer={false} score={true}/>                 
                </Grid>
                </Grid>
                  
                ),
            )}
        
      </div>
    );
  };
  
