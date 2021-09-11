import clsx from 'clsx';
import { FC, useRef, useEffect, useState, useContext } from 'react';
import { Typography, Grid, Box, Button } from '@material-ui/core';
import useStylesGamePart from '@styles/gamePart.style';
import { ITimerState, IUser } from 'utils/interfaces';
import AppContext from 'store/store';

interface TimerProps { 
    timer: ITimerState;
    dealer: IUser;
}

export const Timer: FC<TimerProps> = ({ timer, dealer }) => {
    const { state } = useContext(AppContext);
    console.log('timer ', timer);
    const classes = useStylesGamePart();
    const timerRef = useRef(null);
    const [count, setCount] = useState(timer);

    // useEffect(() => { 
    
    //     state.socket.on('timerStarted', (message) => {
    //         console.log('we got msg timerStarted', message);
    //         let userStartedTimerId = message;
    //         if(userStartedTimerId !== state.userId) {
    //             clearTimer(getDeadTime());
    //         }
    //     });
    
    //     return () => {
    //       state.socket.off('timerStarted', (message) => {
    //         return;
    //       });
    //     };
    //   }, []);

    state.socket.on('timerStarted', (message) => {
        console.log('we got msg timerStarted', message);
        let userStartedTimerId = message;
        if(userStartedTimerId !== state.userId) {
            clearTimer(getDeadTime());
        }
    });

    const getTimeRemaining = (e: Date) => {
        const newDateString = new Date().toString();
        const total = Date.parse(e.toString()) - Date.parse(newDateString);
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
       
        return {
            total, minutes, seconds
        };
    };

    const startTimer = (e: Date) => {
        let { total, minutes, seconds } 
                    = getTimeRemaining(e);
        if (total >= 0) {  
            // update the timer
            setCount({
                minutes: minutes,
                seconds: seconds
            });
        }
    };

 
    const clearTimer = (e: Date) => {
        setCount(timer);
  
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        timerRef.current = id;
    };

    const getDeadTime = () => {
        let deadline = new Date();    
        deadline.setMinutes(deadline.getMinutes() + timer.minutes);
        deadline.setSeconds(deadline.getSeconds() + timer.seconds);
        return deadline;
    };

    const onClickReset = () => {
        clearTimer(getDeadTime());
        state.socket.emit('startTimer', state.roomId , state.userId);
    }
    console.log('state', state);
    return (
         
        <Grid container justifyContent="center" alignItems="center" className={classes.timerContainerWrapper}>        
            <span className={classes.timerContainer}>
              <div className={classes.timeContainer}>
              <Box boxShadow={4} className={classes.timerBox}>
              <Typography align="center" className={classes.timerText}> {count.minutes}  </Typography>
              <Typography align="center" className={classes.timerColon}>  :  </Typography>
              <Typography align="center" className={classes.timerText}>  {count.seconds < 10 ? `0${count.seconds}` : count.seconds} </Typography>
              </Box>
              </div>
              { state.dealer && 
                <Button
                    variant="contained"
                    className={clsx(classes.btn, classes.btnTimer)}
                    onClick={onClickReset}
                >
                        {count.minutes === 0 && count.seconds === 0 ? 'restart round' : 'run round'}
                </Button>
              }
            </span>        
            { state.dealer &&
                <Button
                    variant="contained"
                    className={clsx(classes.btn, classes.btnTimer)}
                    onClick={onClickReset}                    
                >
                    Next Issue
                </Button>
            }
        </Grid>
    );
};
