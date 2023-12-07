import React, { useState } from "react";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/StepLabel';
import basicButton from './basicButton';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import './item.css';

const steps = ['In progress','Pending', 'Completed']/*array/list of all steps*/
const stepDescription = ['Waiting for all users to accept transaction','Waiting for other user to accept transaction', 'All users have accepted']


function MyRequests() {
    const[activeStep, setActiveStep] = useState(0);/*stepper can communicate with usestate */
    
    const[completed,setCompleted]= useState({});/**Updated everytime next button is selected, and marks step as completed*/
    
    const totalSteps = steps.length;
    
    const completedSteps = Object.keys(completed).length;//since completed is an object, we return the length of the object completed
    
    const allStepsCompleted = completedSteps === totalSteps;

    

    const [items, setItems] = useState([]);

    const getItems = async (e) => {
        await fetch('/api/transaction/get/buyer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: localStorage.getItem('email')}),
        })
        .then((res) => {
            if (res.status === 200) {
                console.log('Success');
                return res.json();
            } else {
                console.log('Failed');
            }
        })
        .then((data) => {
            setItems(data.transactions);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const deleteBuyerApproved = (_id) => (e)=> {
        e.preventDefault();
        fetch('/api/transaction/delete/approval', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: _id, email: localStorage.getItem('email')}),
        })
        .then((res) => {
            if (res.status === 200) {
                console.log('Success');
                return res.json();
            } else {
                console.log('Failed');
            }
        })
        .then((data) => {
            console.log(data.message);
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const changeBuyerApproved = (_id) => (e)=> {
        e.preventDefault();
        fetch('/api/transaction/approve', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: _id, email: localStorage.getItem('email')}),
        })
        .then((res) => {
            if (res.status === 200) {
                console.log('Success');
                return res.json();
            } else {
                console.log('Failed');
            }
        })
        .then((data) => {
            console.log(data.message);
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const status = (item) => {
        if (item.status === true) {//completed transaction
            return <Box sx={{width:'100%'}}> {/*width of stepper bar */}
            <Stepper activeStep={2}>
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
                    
                        
                        </Box>
                    </>
                ):  
                (
                    <>
                        <Typography
                            sx= {{mt:2, mb:1}}
                        >
                            {stepDescription[2]}{/*step description*/}
                        </Typography>
                        <Box
                            sx={{display: 'flex', flexDirection:'row', pt:2}}
                        >
                        
                        <Box sx={{flex: '1 1 auto'}}/>
                        
                         
                        </Box>
                    </>
                )}       
            </div>
        </Box>;;
        }
        else if (item.sellerApproved === true || item.buyerApproved === true) {//in progress, either user accepted
            return <Box sx={{width:'100%'}}> {/*width of stepper bar */}
            <Stepper activeStep={1}>
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
                    
                        
                        </Box>
                    </>
                ):  
                (
                    <>
                        <Typography
                            sx= {{mt:2, mb:1}}
                        >
                            {stepDescription[1]}{/*step description*/}
                        </Typography>
                        <Box
                            sx={{display: 'flex', flexDirection:'row', pt:2}}
                        >
                        
                        <Box sx={{flex: '1 1 auto'}}/>
                        
                         
                        </Box>
                    </>
                )}       
            </div>
        </Box>;
        }
        else {//pending
            return <Box sx={{width:'100%'}}> {/*width of stepper bar */}
            <Stepper activeStep={0}>
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
                    
                        
                        </Box>
                    </>
                ):  
                (
                    <>
                        <Typography
                            sx= {{mt:2, mb:1}}
                        >
                            {stepDescription[0]}{/*step description */}
                        </Typography>
                        <Box
                            sx={{display: 'flex', flexDirection:'row', pt:2}}
                        >
                        
                        <Box sx={{flex: '1 1 auto'}}/>
                        
                         
                        </Box>
                    </>
                )}       
            </div>
        </Box>;;
        }
    }

    const sellerApproved = (item) => {
        if (item.sellerApproved === true) {
            return `${item.seller} has approved this transaction`
        }
        if (item.sellerApproved === false) {
            return "Waiting on seller"
        }
    }

    const deleteTransaction = (_id) => (e)=> {
        e.preventDefault();
        fetch('/api/transaction/delete/transaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: _id, email: localStorage.getItem('email')}),
        })
        .then((res) => {
            if (res.status === 200) {
                console.log('Success');
                return res.json();
            } else {
                console.log('Failed');
            }
        })
        .then((data) => {
            console.log(data.message);
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        getItems();
    }, [items.length]);
    return (
        <div>
            <h1>My Requests</h1>
            <br></br>
        
                    {/**end of progress bar component */}
            
            {items.map((item) => (
                <div className="item" key={item._id}>
                    <h1>{item.date.substring(0,10)}</h1>
                    <h2>{item.itemName}</h2>
                    <img src={item.itemImage} alt={item.itemName} />
                    <h2>{item.seller}</h2>
                    <p>${item.amount}</p>
                    <p>{item.buyerApproved}</p>
                    <p>{item.sellerApproved}</p>
                    <p>Status: {status(item)}</p>
                    <p>Buyer Approved:</p>
                    { item.buyerApproved === true ? 
                        (
                            <form onSubmit={deleteBuyerApproved(item._id)}>
                                <button type="submit">Cancel</button>
                            </form>
                        ) : (
                            <form onSubmit={changeBuyerApproved(item._id)} >
                                <button type="submit" style={{backgroundColor: 'green'}} >Accept</button>
                                
                            </form>
                        )
                    }
                    <p>Seller Approved: {sellerApproved(item)}</p>
                    { item.sellerApproved === true && item.buyerApproved === true ? 
                        (
                            //Rating form
                            <Link to={`/createComment`}>
                                <button>Rate</button>
                            </Link>
                            
                        ) : (
                            <form onSubmit={deleteTransaction(item._id)}>
                                <button type="submit" style={{backgroundColor: 'red'}}>Delete Transaction</button>
                            </form>
                        )
                    }
                    <form>
                        <Link to={`/item/${item.itemId}`}>
                            <button type="submit">View Item</button>
                        </Link>
                    </form>
                </div>   
                ))}
        </div>
        
        
    );
}

export default MyRequests;