import React, { FC } from 'react';
import { IGameIssue } from 'utils/interfaces';
import { Grid } from '@material-ui/core';
import { IssueCard } from './issueCard';

interface IssuesCardsProps {
  issues: Array<IGameIssue>;
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
              issueName={issue.issueName}
              priority={issue.priority}
              onIssueClick={onIssueClick}
              activeIssueName={activeIssueName}
              addIssue={false}
              key={`${issue.issueName}-${Date.now()}`}
            />
        ))}
    </>
  );
};
