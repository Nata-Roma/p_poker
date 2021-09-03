// import Image from 'next/image';
import {
  Grid,
  Avatar,
  createStyles,
  Theme,
  makeStyles,
  FormControl,
  InputLabel,
  Input,
} from '@material-ui/core';
import { FC, useState } from 'react';
import getFormattedImgDataLink from 'utils/imgToDatalink';
import { defaultAvatar } from '../../../utils/defaultAvatar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    large: {
      width: '100px',
      height: '100px',
    },
    inputPad: {
      padding: theme.spacing(0, 4),
    },
  }),
);

interface CreateAvatarProps {
  loading: (status: boolean) => void;
  addAvatar: (data: string) => void;
}

export const CreateAvatar: FC<CreateAvatarProps> = ({ loading, addAvatar }) => {
  const classes = useStyles();
  const [ src, setSrc ] = useState(defaultAvatar);

  const [ inputValue, setInputValue ] = useState('');

  const createImageBlob = async (e) => {
    setInputValue(e.target.value);
    loading(true);
    const fileBlob = e.target.files[0];
    const data = await getFormattedImgDataLink(100, fileBlob);
    setSrc(data);
    addAvatar(data);
    loading(false);
    setInputValue('');
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item xl={6}>
        <Avatar className={classes.large}>
          <img src={src} width="100" height="100" />
        </Avatar>
      </Grid>
      <Grid item xl={6} className={classes.inputPad}>
        <FormControl>
          <InputLabel htmlFor="input-with-icon-adornment">
            Choose your avatar
          </InputLabel>
          <Input
            id="input-with-icon-adornment"
            type="file"
            style={{ visibility: 'hidden' }}
            onChange={(e) => createImageBlob(e)}
            value={inputValue}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};
