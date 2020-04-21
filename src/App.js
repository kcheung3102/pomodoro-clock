import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Timer from './components/Timer';
import Controls from './components/Controls';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TimerSet from './components/TimerController';
import Grid from '@material-ui/core/Grid';

import { useInterval } from './hooks/useInterval'


const useStyles = makeStyles({

  centerAlign: {
    textAlign:'center',
  },


})


const App = () => {
  const classes = useStyles();

  const [taskVal, setTaskVal] = useState("")
  const [breakVal, setBreakVal] = useState(5)
  const [mode, setMode] = useState('session')
  const [sessionVal, setSessionVal] = useState(25)
  const [time, setTime] = useState(sessionVal * 60 * 1000)
  const [timerRunning, setTimerRunning] = useState(false)

    //countdown
    useInterval(() => setTime(time - 1000), timerRunning ? 1000 : null)

  //updates the input
  const handleInput = (e) => {
    let input = e.target.value 

    setTaskVal(input);
  }

  const addTask = (e) => {
    if(e.key === "Enter") {

    }
  }

  useEffect(() => {
    //when the time equals 0 and mode is session
    //play the sound
    //you set it to break and the state of the break value
    //ask if the task was completed or not

    //if it is on break mode and time reaches 0
    //play the sound
    //reset the timer back to default state 

    if(time === 0 && mode === 'session') {
      setMode('break')

      //play sound

      setTime(breakVal * 60 * 1000)
    } else if (time === 0 && mode === 'break') {
      setMode('session')
      setTime(sessionVal * 60 * 1000)
    }
  }, [time, sessionVal, breakVal, mode])

  //updates the session value time
  useEffect(() => {
    setTime(sessionVal * 60 * 1000)
  }, [sessionVal])




  const handleStart = () => {
    //when paused you stop the timer 
  }


  
  const handleReset = () => {
      setMode('session');
      setBreakVal(5);
      setSessionVal(25);
      setTime(sessionVal * 60 * 1000);
  }
  
  return (
    <Container maxWidth='sm' className={classes.background}>
      <Box className={classes.centerAlign}>
      <header className="App-header">
          <h1>Pomodoro Timer</h1>
      </header>
        <TaskForm 
        currentTask={[taskVal,setTaskVal]}
        handleInput={handleInput}
         />
        <Timer currentTime={[time,setTime]} currentMode={[mode,setMode]}/>
        <Controls
        activeStatus={[timerRunning, setTimerRunning]}
        handleReset={handleReset}

         />
        <Grid container >
          <Grid item xs={6}>
          <TimerSet type={'session'} value={[sessionVal, setSessionVal]}/>
          </Grid>
         <Grid item xs={6}>
         <TimerSet type={'break'} value={[breakVal, setBreakVal]}/>
         </Grid>
         </Grid>
      </Box>
    </Container>
  );
}

export default App;
