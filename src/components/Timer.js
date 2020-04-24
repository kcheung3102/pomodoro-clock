import React from 'react'
import Moment from 'react-moment';
import Typography from '@material-ui/core/Typography';

 const Timer = ({currentTime, currentMode}) => {
    const [time] = currentTime
    const [mode] = currentMode
    return (
        <div>
            <Typography variant="h4" gutterBottom>
                {mode === 'session' ? 'Session' : 'Break'}
            </Typography>
            <Typography variant="h1" gutterBottom>
                <Moment format="mm:ss">{time}</Moment>
            </Typography>
            
        </div>
    )
}

export default Timer;
