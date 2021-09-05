import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles({
  root: {
    width: 250,
    height: 63,
    minWidth: 275,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    fontSize: 12
  },
  text: {
    fontSize: 16
  },
  cardContainer: {
    padding: 5
  },
  currentBackground: {
    backgroundColor: "#60dabf"
  }

});

export default function IssuesCards({ issues }) {
  const [issuesArray, setIssuesArray] = useState(issues);
  const classes = useStyles(); 
  const currentIssue = 1;

  const deleteIssue = (issue: number) => { 
    setIssuesArray(issuesArray.filter((i: number) => i !== issue)); 
  };

  const createIssue = () => {
    const sortIssues = issuesArray.sort();
    const newIssueNum = sortIssues[sortIssues.length - 1] + 1;
    const newArr = [...issuesArray, newIssueNum]
    console.log('new issues', newArr);
    setIssuesArray(newArr);
  }

  return (
    <div>
      {[...issuesArray].map((issue: number) => (
        <div className={classes.cardContainer} key={issue}>
          <Card
            className={
              issue === currentIssue
                ? `${classes.root} ${classes.currentBackground}`
                : `${classes.root}`
            }
          >
            <CardContent>
              {issue === currentIssue && (
                <Typography
                  className={classes.title}
                  color="textPrimary"
                  gutterBottom
                >
                  Current
                </Typography>
              )}
              <Typography
                className={classes.text}
                variant="h6"
                color="textPrimary"
                gutterBottom
              >
                Issue
              </Typography>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Low Priority
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="large" onClick={() => deleteIssue(issue)}>
                {/* < ClearIcon onClick={deleteIssue(issue)}/> */}
                <ClearIcon />
              </Button>
            </CardActions>
          </Card>
        </div>
      ))}
      <div className={classes.cardContainer}>
        <Card className={classes.root}>
          <CardContent>
            <Typography
              className={classes.text}
              variant="h6"
              color="textPrimary"
              gutterBottom
            >
              Create New Issue
            </Typography>
          </CardContent>
          <CardActions >
          <Button size="large" onClick={createIssue}>
            <AddIcon />
            </ Button >
          </CardActions>
        </Card>
      </div>
    </div>
  );
};
