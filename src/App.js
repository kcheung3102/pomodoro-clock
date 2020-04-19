import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Timer from './components/Timer';

const App = () => {
  const [taskVal, setTaskVal] = useState("")
  const [breakVal, setBreakVal] = useState(5)
  const [mode, setMode] = useState('session')
  const [sessionVal, setSessionVal] = useState(25)
  const [time, setTime] = useState(sessionVal * 60 * 1000)

  //updates the input
  const handleInput = (e) => {
    setTaskVal(e.target.value);
  }

  const startTask = (e) => {
    //check if the input is empty or not 
    //starts the timer countdown
  }

  const stopTask = () => {
    //when paused you stop the timer 
  }
  
  return (
    <div className="App">
      <header className="App-header">
          <h1>Pomodoro Timer</h1>
      </header>
        <TaskForm 
        currentTask={[taskVal,setTaskVal]}
        handleInput={handleInput}
         />
        <Timer currentTime={[time,setTime]} currentMode={[mode,setMode]}/>
    </div>
  );
}

export default App;
