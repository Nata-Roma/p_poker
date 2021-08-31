import { Grid, Button, IconButton, Typography } from '@material-ui/core';
import useStylesFooter from '@styles/footer.style';
import useStylesRssIcon from '@styles/rssIcon.style';
import { RssIcon } from 'components/svg-to-tsx/rss-logo';
import Link from 'next/link';

export const Footer = () => {
  const classesIcon = useStylesRssIcon();
  const classes = useStylesFooter();

  return (
    <div className={classes.container}>
    <Grid container alignItems="center" justifyContent="space-between" className={classes.root}>
      <Grid item>
        <Typography variant='subtitle1'>2021</Typography>
      </Grid>
      <Grid item>
        <Button
          size="medium"
          href="https://github.com/Nata-Roma"
          target="_blank"
        >
          @Nata-Roma
        </Button>
      </Grid>
      <Grid item>
        <Button size="medium" href="https://github.com/ML6503" target="_blank">
          @ML6503
        </Button>
      </Grid>
      <Grid item>
        <Button
          size="medium"
          href="https://github.com/IlayMorozoff"
          target="_blank"
        >
          @IlayMorozoff
        </Button>
      </Grid>
      <Grid item>
        <div className={classesIcon.container}>
          <RssIcon />
        </div>
      </Grid>
    </Grid>
    </div>
  );
};
