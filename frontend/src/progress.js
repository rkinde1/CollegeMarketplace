import React, { useState } from "react";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/StepLabel';
import basicButton from './basicButton';
import Box from '@mui/material/Box';
/*may need to import trade page*/
const steps = ['Accept', 'In progress', 'Completed']/*array/list of all steps*/
const stepDescription = ['Accept transaction', 'Transaction in progress', 'Transaction completed']

const Progress = () => {
    const[activeStep, setActiveStep] = useState(0);/*stepper can communicate with usestate */
    
    const[completed,setCompleted]= useState({});/**Updated everytime next button is selected, and marks step as completed*/
    
    const totalSteps = steps.length;
    
    const completedSteps = Object.keys(completed).length;//since completed is an object, we return the length of the object completed
    
    const allStepsCompleted = completedSteps === totalSteps;
    
    const handleBack =()=>{{/*Function to decrease step increment */}
        setActiveStep((prevActiveStep)=> prevActiveStep - 1)
    };
    
    const handleNext =()=>{{/*Function to increase step increment */}
        const newCompleted = completed;
        newCompleted[activeStep]= true;/**depends on active step value, we can determine which step has been completed */
        setCompleted(newCompleted);
        setActiveStep((prevActiveStep)=> prevActiveStep + 1)
    };
    
    const handleReset =()=>{//resets active step to 0, and marks as completed
        setActiveStep(0);
        setCompleted({});
    };
    
    return(
        <Box sx={{width:'50%'}}> {/*width of stepper bar */}
            <Stepper activeStep={activeStep}>
                {steps.map((step, index)=>(
                    <Step 
                        key={step}
                        completed= {completed[index]}
                    >
                        <StepLabel>{step}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div> 
                {allStepsCompleted ?(
                    <>
                    <Typography
                        sx={{mt: 2, mb:1}}
                    >All Steps Completed
                    </Typography>
                    <Box
                        sx={{display:'flex', flexDirection:'row', pt:2}}
                    >
                        <Box sx={{flex:'1 1 auto'}}/>
                    
                        <basicButton
                                variant="contained"
                                onClick= {handleReset}
                            >
                                Reset
                            </basicButton>
                        </Box>
                    </>
                ):  
                (
                    <>
                        <Typography
                            sx= {{mt:2, mb:1}}
                        >
                            {stepDescription[activeStep]}{/*step description changes with step*/}
                        </Typography>
                        <Box
                            sx={{display: 'flex', flexDirection:'row', pt:2}}
                        >
                        <basicButton 
                            onClick= {handleBack}
                            variant= "contained"
                            disabled={activeStep === 0}/*back button cannot be clicked when at step 1*/ 
                            sx ={{mr:1}}
                        >
                            Back
                        </basicButton>
                        <Box sx={{flex: '1 1 auto'}}/>
                        {/*<basicButton 
                            onClick= {handleNext}
                            variant= "contained"
                            color= "blue"
                        >
                            Accept
                        </basicButton>*/}
                        <basicButton //finish button should allow users to submit a form,page,etc. then allow user to reset
                            onClick={handleNext}
                            variant= "conatained"
                        >
                            {completedSteps === totalSteps - 1 ? 'Complete': 'Accept'} 
                        </basicButton> {/*if true then render finish, otherwise next*/} 
                        </Box>
                    </>
                )}       
            </div>
        </Box>
    )
}
export default Progress;