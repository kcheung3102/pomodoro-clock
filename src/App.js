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
import TaskList from './components/TaskList';
import Card from '@material-ui/core/Card';

import alarm from './sound/watch-alarm.mp3';
import { useInterval } from './hooks/useInterval';


const useStyles = makeStyles({

  centerAlign: {
    textAlign:'center',
  },
    root: {
      minWidth: 500,
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
    }
  


})


const App = () => {
  const classes = useStyles();

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
      setTimerRunning(false)
    } else if (time === 0 && mode === 'break') {
      beep.current.play()
      setMode('session')
      setTime(sessionVal * 60 * 1000)
      alert("Break Time is up!")
    }
  }, [time, sessionVal, breakVal, mode])

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

  return (
    <div className={classes.background}>
     <header className="App-header">
                  <h1>Pomodoro Timer</h1>
              </header>
      <Container className={classes.container}>
          <Grid  
            container  
            direction="row"
            justify="space-around"
            spacing={4}>
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
              <Card className={classes.root} variant='outlined'>
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
    </div>

  );
}

export default App;
