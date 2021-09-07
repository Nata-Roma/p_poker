import { FC } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import { useStylesIssueCard } from '@styles/issueCard.style';

interface IssueCardProps {
  issueName: string;
  priority: string;
  activeIssueName?: string;
  onIssueClick?: (issueName: string) => void;
  addIssue: boolean;
  onAddIssue?: () => void;
}

export const IssueCard: FC<IssueCardProps> = ({
  issueName,
  priority,
  activeIssueName,
  onIssueClick,
  addIssue,
  onAddIssue,
}) => {
  const classes = useStylesIssueCard();
  return (
    <Card
      className={
        activeIssueName === issueName ? (
          `${classes.root} ${classes.activeCard}`
        ) : (
          `${classes.root}`
        )
      }
      onClick={!addIssue? () => onIssueClick(issueName): null}
    >
      <CardContent>
        <Typography
          className={
            activeIssueName === issueName ? (
              `${classes.text} ${classes.activeCard}`
            ) : (
              classes.text
            )
          }
          variant="h6"
        >
          {issueName === 'Create New Issue' ? issueName : `Issue: ${issueName}`}
        </Typography>
        {priority && (
          <Typography
            className={classes.title}
            color="textSecondary"
            variant="subtitle2"
          >
            Priority: {priority}
          </Typography>
        )}
      </CardContent>
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
