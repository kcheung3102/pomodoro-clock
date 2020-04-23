import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import Fab from '@material-ui/core/Fab';
import PauseIcon from '@material-ui/icons/Pause';


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
 
  }));

const Controls = ({activeStatus, handleReset, disabledButton}) => {
    const [timerRunning, setTimerRunning] = activeStatus
    const [disabled, setDisabled] = disabled
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Fab color="primary" aria-label="play" disabled={disabled} onClick={() => setTimerRunning(!timerRunning)}>
                {timerRunning ? <PauseIcon/> : <PlayArrowIcon /> }
            </Fab>
            <Fab color="primary" aria-label="play" onClick={handleReset}>
                 <RotateLeftIcon />
                
            </Fab>
        </div>
    )
}

export default Controls;

