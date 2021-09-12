import { FC, useContext } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import { useStylesIssueCard } from '@styles/issueCard.style';
import { Grid } from '@material-ui/core';
import clsx from 'clsx';
import { IGameIssue } from 'utils/interfaces';
import AppContext from 'store/store';

interface IssueCardProps {
  issueName: string;
  priority: string;
  activeIssueName?: string;
  onIssueClick?: (issueName: string) => void;
  addIssue: boolean;
  onAddIssue?: () => void
  score: number;
  amendedScore?: number
  onAmendScore?: () => void
}

export const IssueCard: FC<IssueCardProps> = ({
  issueName,
  priority,
  activeIssueName,
  onIssueClick,
  addIssue,
  onAddIssue,
  score,
  amendedScore,
  onAmendScore,
}) => {
  const classes = useStylesIssueCard();
  const { state } = useContext(AppContext);
  const activeCard = clsx(classes.root, activeIssueName === issueName && classes.activeCard);
  const activeText = clsx(classes.text, activeIssueName === issueName && classes.activeCard);

  return (
    <Card
      className={activeCard}
      onClick={!addIssue ? () => onIssueClick(issueName) : null}
    >
      <Grid container justifyContent="space-between" alignItems="flex-start">
        <div className={classes.block}>
          <Typography
            className={activeText}
            variant="h6"
          >
            {issueName === 'Create New Issue' ? (
              issueName
            ) : (
              `Issue: ${issueName}`
            )}
          </Typography>
          {priority && (
            <Typography color="textSecondary" variant="subtitle2">
              Priority: {priority}
            </Typography>
          )}
        </div>
        <div className={classes.blockScore} onClick={score && state.dealer ? onAmendScore : null}>
          {!(issueName === 'Create New Issue') && (
            <>
              <Typography
                className={activeText}
                variant="h6"
                align="right"
              >
                Score
              </Typography>
              <Typography color="textSecondary" variant="h5" align="center">
                {amendedScore ? amendedScore : score ? score : '-'}
              </Typography>
            </>
          )}
        </div>
      </Grid>
      {addIssue && (
        <CardActions>
          <Button size="large" onClick={onAddIssue}>
            <AddIcon />
          </Button>
        </CardActions>
      )}
    </Card>
  );
};
