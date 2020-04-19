import React from 'react'
import Moment from 'react-moment';

 const Timer = ({currentTime, currentMode}) => {
    const [time] = currentTime
    const [mode] = currentMode
    return (
        <div>
            <h1>{mode}</h1>
             <Moment format="mm:ss">{time}</Moment>
        </div>
    )
}

export default Timer;
