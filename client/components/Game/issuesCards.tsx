import React, { FC, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import { IGameIssue } from 'utils/interfaces';

const useStyles = makeStyles({
  root: {
    width: 250,
    height: 63,
    minWidth: 275,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
    padding: 0,
  },
  text: {
    fontSize: 16,
    padding: 0,
  },
  cardContainer: {
    padding: 5,
  },
  currentBackground: {
    backgroundColor: '#60dabf',
  },
  cardContent: {
    padding: '0 0 0 15px',
  },
});

interface IssuesCardsProps {
  issues: Array<IGameIssue>;
}

export const IssuesCards: FC<IssuesCardsProps> = ({ issues }) => {
  const [ issuesArr, setIssuesArr ] = useState<Array<IGameIssue>>();
  const [currentIssue, setCurrentIssue] = useState<IGameIssue>();
  const classes = useStyles();

  const deleteIssue = (issue: string) => {
    // setIssuesArr(issuesArr.filter((i: number) => i !== issue));
    console.log('delete issue');
    
  };

  const createIssue = () => {
    // const sortIssues = issuesArr.sort();
    // const newIssueNum = sortIssues[sortIssues.length - 1] + 1;
    // const newArr = [ ...issuesArr, newIssueNum ];
    // console.log('new issues', newArr);
    // setIssuesArr(newArr);
    console.log('create issue');
    
  };

  useEffect(() => {
    console.log('current Issue', issues[0]);
    setIssuesArr(issues)
    setCurrentIssue(issues[0])
  }, [issues]);

  return (
    <div>
      {issuesArr && issuesArr.map((issue) => (
        <div className={classes.cardContainer} key={issue.issueName}>
          <Card
            className={
              issue.issueName === currentIssue.issueName ? (
                `${classes.root} ${classes.currentBackground}`
              ) : (
                `${classes.root}`
              )
            }
          >
            <CardContent className={classes.cardContent}>
              {issue.issueName === currentIssue.issueName && (
                <Typography className={classes.title} color="textPrimary">
                  Current
                </Typography>
              )}
              <Typography
                className={classes.text}
                variant="h6"
                color="textPrimary"
              >
                Issue:{' '}{issue.issueName}
              </Typography>
              <Typography className={classes.title} color="textSecondary">
              Priority:{' '}{issue.priority}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="large" onClick={() => deleteIssue(issue.issueName)}>
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
          <CardActions>
            <Button size="large" onClick={createIssue}>
              <AddIcon />
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};
