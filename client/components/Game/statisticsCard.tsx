import { FC } from 'react';
import { makeStyles, createStyles, Theme, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { IGamePageIssueScore } from 'utils/interfaces';

const useStylesStatisticsCard = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: 115,
      margin: theme.spacing(0, 0.5),
    },
  }),
);

interface StatisticsCardProps {
  stat: IGamePageIssueScore;
}

export const StaticticsCard: FC<StatisticsCardProps> = ({ stat }) => {
  const classes = useStylesStatisticsCard();

  return (
    <Button
      variant="outlined"
      className={classes.container}
      onClick={() => console.log(stat.choice)}
    >
      <div>
        <Typography variant="h3" gutterBottom>{`${stat.choice}`}</Typography>
        <Typography variant="h5">{`${stat.ratio}%`}</Typography>
      </div>
    </Button>
  );
};
