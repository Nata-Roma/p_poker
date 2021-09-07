import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStylesSettingsGame = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      cursor: 'pointer',
    },
    gameName: {
      fontSize: '18px',
    },
    switch: {
      marginLeft:'0'
    },
    settingsLabel: {
      marginTop: '10px'
    },
    timerInput: {
      width: '90px',
    },
    timerInputRigth: {
      marginLeft:'10px',
      width: '90px',
    }
  }),
);