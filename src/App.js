import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Timer from './components/Timer';
import Controls from './components/Controls';
import Container from '@material-ui/core/Container';

import { useInterval } from './hooks/useInterval'



const App = () => {
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

  
  useEffect(() => {
    setTime(sessionVal * 60 * 1000)
  }, [sessionVal])


  // const startTask = (e) => {
  //   if(e.key === "Enter") {
  //     e.taskVal.trim() === "" ||  e.taskVal.trim().length === 0 ?
  //        alert("Please Enter in a Task")
  //     : 
  //   }
  
  // }

  const stopTask = () => {
    //when paused you stop the timer 
  }

  const handleStart = () => {
    //when paused you stop the timer 
  }

  const handleStop = () => {
    setTimerRunning(false);
  }
  
  const handleReset = () => {
      setMode('session');
      setBreakVal(5);
      setSessionVal(25);
      setTime(sessionVal * 60 * 1000);
  }
  
  return (
    <Container maxWidth='sm'>
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
    </Container>
  );
}

export default App;
