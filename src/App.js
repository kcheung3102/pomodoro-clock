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
import TaskCurrent from './components/TaskCurrent';
import Card from '@material-ui/core/Card';

import { useInterval } from './hooks/useInterval'


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
    setDisabled(!disabled);
    //display the current task that was entered
    //enable the buttons to be used
     //resets the form
    setTaskVal('');
  
  }


 

    const deleteTask = (taskId) => {
      //filters out and finds if the task
      const newTasks = tasks.filter((_,id) => id !== taskId);
      setTasks(newTasks);
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
      alert("Do you finish your task?")
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

 

  //updates to default setup
  const handleReset = () => {
      setMode('session');
      setBreakVal(5);
      setSessionVal(25);
      setTime(sessionVal * 60 * 1000);
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
                  deleteTask = {deleteTask}
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
    </div>

  );
}

export default App;
