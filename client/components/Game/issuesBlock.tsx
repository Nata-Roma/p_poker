import { FC, useEffect, useState } from 'react';
import { Typography, Grid} from '@material-ui/core';
import { IGameIssue, IGamePageIssue, IGamePageIssueScore } from 'utils/interfaces';
import useStylesGamePart from '@styles/gamePart.style';
import { StaticticsCard } from './statisticsCard';
import { nanoid } from 'nanoid';
import { IssueCard } from './issueCard';

interface IssuesBlockProps {
  issues: Array<IGamePageIssue>;
  onIssueClick: (issueName: string) => void;
  activeIssueName: string;
  onAddIssue: () => void
}

export const IssuesBlock: FC<IssuesBlockProps> = ({
  issues,
  activeIssueName,
  onIssueClick,
  onAddIssue
}) => {
  const classes = useStylesGamePart();
  const [ stat, setStat ] = useState<Array<IGamePageIssueScore>>();

  useEffect(
    () => {
      const activeStat = issues.find(
        (item) => item.issue.issueName === activeIssueName,
      );
      if (activeStat) {
        setStat(activeStat.score);
      }
    },
    [ issues ],
  );

  return (
    <Grid container item className={classes.mBottom}>
      <div className={classes.issuesContainer}>
        <Typography variant="h5">Issues:</Typography>
        {issues &&
          issues.map((issue) => (
            <IssueCard
              issueName={issue.issue.issueName}
              priority={issue.issue.priority}
              onIssueClick={onIssueClick}
              activeIssueName={activeIssueName}
              addIssue={false}
              score={issue.totalScore}
              key={`${issue.issue.issueName}-${Date.now()}`}
            />
          ))}
        <IssueCard
          issueName="Create New Issue"
          priority=""
          addIssue={true}
          onAddIssue={onAddIssue}
          score={0}
        />
      </div>
      <div className={classes.statContainer}>
        <Typography variant="h5" gutterBottom>Statistics:</Typography>
        {stat &&
          stat.map((item) => <StaticticsCard key={nanoid()} stat={item} />)}
      </div>
    </Grid>
  );
};
