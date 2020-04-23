import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
    width: '100%',
    maxWidth: 500,
    color: '#ccc',
    },
    input: {
        color: '#ccc',
        
    },
   
}));


export default function TaskForm({ handleInput, handleNewTask, currentTask }) {
    const classes = useStyles();
    const [task] = currentTask;

    return (
        <Grid container>
            <Grid item xs={7}>
                <form noValidate autoComplete="off" onSubmit={handleNewTask}>
                <TextField 
                className={classes.root}
                inputProps={{
                    className: classes.input
                }}
                InputLabelProps={{
                    className: classes.input
                }}
                id="outlined-basic" 
                label="Enter Task" 
                variant="outlined" 
                color="secondary"
                value={task}
                onChange={handleInput}
                />
                </form>
            </Grid>
        </Grid>
    )
}


