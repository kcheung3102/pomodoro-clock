import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Timer from './components/Timer';
import Controls from './components/Controls';
import TimerSet from './components/TimerController';
import TaskList from './components/TaskList';
import Popup from './components/Popup';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';


import alarm from './sound/watch-alarm.mp3';
import { useInterval } from './hooks/useInterval';


const useStyles = makeStyles({

  centerAlign: {
    textAlign:'center',
  },
    root: {
      minWidth: 500,
      backgroundColor:'#292f38',
      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.4)',
      color: 'white',
    },
    background: {
      background:'linear-gradient(100deg, rgb(182, 40, 111) 50%, #ac2066 0)',
      height: '100vh',
    },

    cardWrapper: {
      background: '#292f38',
      borderRadius: '5px',
      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.4)',
      height: '400px',
      padding: '10px'
    },
    padding: {
      padding: '20px',
    },
    container: {
      paddingTop: '15rem',
      alignItems: 'center',
    },
    title: {
      textAlign:'center',
      lineHeight: '1',
    }
})


const App = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([])
  const [taskVal, setTaskVal] = useState("")
  const [breakVal, setBreakVal] = useState(5)
  const [mode, setMode] = useState('session')
  const [sessionVal, setSessionVal] = useState(25)
  const [time, setTime] = useState(sessionVal * 60 * 1000)
  const [timerRunning, setTimerRunning] = useState(false)
  const [disabled, setDisabled] = useState(false);
  const beep = useRef();

    //countdown using custom hook
    useInterval(() => setTime(time - 1000), timerRunning ? 1000 : null)

  //updates the input
  const handleInput = (e) => {
    e.preventDefault();
    let input = e.target.value 
    setTaskVal(input);
    
  }

  const handleNewTask = (e) => {
    e.preventDefault();
    
    //prevents the user from entering empty strings
    if(taskVal.trim() === '' || taskVal.trim().length === 0) return
    setTasks([...tasks, {id: Date.now(), text: taskVal }])
    
    //enables the button
    setDisabled(true);
  
    
     //resets the form
    setTaskVal('');
   }


 

    const deleteTask = (id) => {
      //looks at each task and only returns if task.id is not equal to the id being passed in
      setTasks(tasks.filter((task) => task.id !== id))
    }

    
  

  useEffect(() => {
    //when the time equals 0 and mode is session
    //play the sound
    //set mode to break and then setTime to the break val
    //ask if the task was completed or not

    //if it is on break mode and time reaches 0
    //play the sound
    //reset the timer back to default state 

    if(time === 0 && mode === 'session') {
      beep.current.play()
      setMode('break')
      setTime(breakVal * 60  * 1000)
      setOpen(true)
      setTimerRunning(false)
      setSessionVal(breakVal)
    } else if (time === 0 && mode === 'break') {
      beep.current.play()
      setMode('session')
      setTime(sessionVal * 60 * 1000)
      setDisabled(false)
      setTimerRunning(false)
      setSessionVal(25)
    }
  }, [time, sessionVal, breakVal, mode, open, disabled])


  //updates the session value time
  useEffect(() => {
    setTime(sessionVal * 60 * 1000)
  }, [sessionVal])

 
  //updates to default setup
  const handleReset = () => {
      setMode('session');
      setBreakVal(5);
      setTimerRunning(false);
      setSessionVal(25);
      setTime(sessionVal * 60 * 1000);
      beep.current.pause()
      beep.current.currentTime = 0;
  }

  
  const handleClose = () => {
    setOpen(false);
    setTimerRunning(true);
  }

  return (
    <div className={classes.background}>
      <Typography variant="h1" component="h2" gutterBottom className={classes.title}>
          Pomodoro Timer
      </Typography>
      <Container className={classes.container} fixed>
          <Grid  
            container  
            direction="row"
            justify="space-around">
            <Grid item xs={4}>
              <Card className={classes.cardWrapper}>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="flex-start">
                <TaskForm 
                  handleInput={handleInput}
                  handleNewTask={handleNewTask}
                  currentTask={[taskVal,setTaskVal]}
                  />
                <TaskList 
                  tasks={tasks}
                  deleteTask={deleteTask}
                />
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={5}>
              <Card className={classes.root}>
                <Box className={classes.centerAlign}>
                <Timer currentTime={[time,setTime]} currentMode={[mode,setMode]}/>
                <Controls
                activeStatus={[timerRunning, setTimerRunning]}
                handleReset={handleReset}
                disabledButton={[disabled,setDisabled]}
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
              </Card>
            </Grid> 
        </Grid>
      </Container>
      <audio
                id='beep'
                ref={beep}
                src={alarm}
                type='audio'
            ></audio>
            <Popup  
            handleClose={handleClose} 
            handleOpen={[open, setOpen]}  
            />
    </div>

  );
}

export default App;
