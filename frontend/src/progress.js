import React, { useState } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/StepLabel';
import basicButton from './basicButton';
/*may need to import trade page*/
const steps = ['Step 1', 'Step2']/*array/list of all steps*/
const stepDescription = ['Description 1', 'Description 2']

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
        <div>
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
                    <Typography>All Steps Completed</Typography>
                    <basicButton
                        variant="contained"
                        onClick= {handleReset}
                    >
                        Reset
                    </basicButton>
                    </>
                ):  
                (
                    <>
                        <Typography>
                            {stepDescription[activeStep]}{/*step description changes with step*/}
                        </Typography>
                        
                        <basicButton 
                            onClick= {handleBack}
                            variant= "contained"
                            disabled={activeStep === 0}/*back button cannot be clicked when at step 1*/ 
                        >
                            Back
                        </basicButton>
                        <basicButton 
                            onClick= {handleNext}
                            variant= "contained"
                        >
                            Next
                        </basicButton>
                        <basicButton //finish button should allow users to submit a form,page,etc. then allow user to reset
                            onClick={handleNext}
                            variant= "conatained"
                        >
                            {completedSteps === totalSteps - 1 ? 'Finish': 'Next'} {/**if true then render finish, otherwise next */}
                        </basicButton>
                    </>
                )}       
            </div>
        </div>
    )
}
export default Progress;