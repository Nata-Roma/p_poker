import { makeStyles, createStyles, Theme } from "@material-ui/core";

const useStylesUserCard = makeStyles((theme: Theme) => 
createStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    width: '92%',
    height: '50px',
    boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.3)'
  },
 
}));

export default useStylesUserCard;
