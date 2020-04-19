import React from 'react'
import TextField from '@material-ui/core/TextField';

export default function TaskForm({currentTask, handleInput}) {
    const [taskVal] = currentTask
    return (
        <div>
            <form noValidate autoComplete="off">
            <TextField 
            id="outlined-basic" 
            label="Enter Task" 
            variant="outlined" 
            onChange={handleInput}
            />
            </form>
        </div>
    )
}


