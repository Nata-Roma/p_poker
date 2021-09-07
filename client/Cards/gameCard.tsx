import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import { FC, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { useStylesGameCard } from '@styles/gameCard.style';

const cardSize = {
  width: 130,
  ratio: 1.38,
};

interface GameCardProps {
  cardImg: string;
  cardNumber: number;
  game?: boolean;
  empty?: boolean;
  onAddCard?: () => void;
  onRemoveCard?: () => void;
}

export const GameCard: FC<GameCardProps> = ({
  cardImg,
  cardNumber,
  onAddCard,
  onRemoveCard,
  game = false,
  empty = false,
}) => {
  const classes = useStylesGameCard(cardSize)();
  const [ clicked, setClicked ] = useState(false);

  const onCardClick = () => {
    setClicked((prev) => !prev);
  };

  return (
    <Card className={classes.root}>
      <Grid container direction="column">
        <Grid item container justifyContent="space-between" alignItems="center">
          <Grid item>
            <CardHeader
              className={classes.cardHeader}
              avatar={
                <Avatar
                  aria-label="card number"
                  className={`${classes.avatar} ${classes.avatarRoot}`}
                >
                  <Typography color="textPrimary" variant="body1">
                    {cardNumber}
                  </Typography>
                </Avatar>
              }
            />
          </Grid>
          <Grid item>
            <CardHeader
              className={classes.cardHeader}
              avatar={
                <Avatar
                  aria-label="card number"
                  className={`${classes.avatar} ${classes.avatarRoot}`}
                >
                  <Typography color="textPrimary" variant="body1">
                    {cardNumber}
                  </Typography>
                </Avatar>
              }
            />
          </Grid>
        </Grid>
        <Grid item className={classes.cardContainer} onClick={onCardClick}>
          <CardMedia
            className={classes.media}
            image={cardImg}
            title="Game Card"
          />
          {game && (
            <div
              className={
                clicked ? (
                  `${classes.cardCover} ${classes.cardCoverActive}`
                ) : (
                  classes.cardCover
                )
              }
            >
              {clicked && (
                <div className={classes.iconUnder}>
                  <CheckCircleIcon color="primary" className={classes.icon} />
                </div>
              )}
            </div>
          )}
          {!game &&
          empty && (
            <div className={classes.cardCover}>
              <Grid container justifyContent="center">
              <AddCircleIcon
                className={classes.emptyCardIcon}
                onClick={onAddCard}
              />
              <RemoveCircleIcon
                className={classes.emptyCardIcon}
                onClick={onRemoveCard}
              />
              </Grid>
            </div>
          )}
        </Grid>
      </Grid>
    </Card>
  );
};
