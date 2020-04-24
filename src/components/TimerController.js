import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const TimerController = ({type, value}) => {
    const [val, setVal] = value

    //error check that goes up to 60 mins
    const handleInc = () => {
        if (val >= 60) {
          return null
        } else {
          setVal(val + 1)
        }
      }

      //error checking for decrementing
      const handleDec = () => {
          if (val === 1){
              return null
          } else {
              setVal(val - 1)
          }
      }
    return (
        <div>
        <Typography variant="h5"  gutterBottom>
            {type + " length "}
        </Typography>
        <Grid
            container
            direction="row"
            alignItems="center" 
            justify="center"
        >  
         <Button>
            <AddIcon  onClick={handleInc}/>
        </Button>
        <Typography variant="h5" gutterBottom>
            {val}
         </Typography>
         <Button>
            <RemoveIcon onClick={handleDec} />
        </Button>
        </Grid>
        </div>
    );
}

export default TimerController;
