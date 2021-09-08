import React, { FC } from 'react';
import { IGamePageIssue } from 'utils/interfaces';
import { Grid } from '@material-ui/core';
import { IssueCard } from './issueCard';

interface IssuesCardsProps {
  issues: Array<IGamePageIssue>;
  activeIssueName: string;
  onIssueClick: (active: string) => void;
}

export const IssueCards: FC<IssuesCardsProps> = ({
  issues,
  activeIssueName,
  onIssueClick,
}) => {

  return (
    <>
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
    </>
  );
};
