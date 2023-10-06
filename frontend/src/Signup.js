import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName,setLastName] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        //needs validation
        //Insert Connor's function to verify email and password
        await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstName, lastName, email, password }),
        })
        .then((res) => {
            if (res.status === 200) {
                alert('Success');
                console.log('Success');
                return res.json();
            } else if (res.status === 400) {
                alert('User already exists');
                console.log('User already exists');
            }
            else {
                alert('Failed');
                alert(res.status);
                console.log('Failed');
            }
        })
    }
    return(
        <div>
            <form onSubmit={handleSignup} method="POST"> 
                <h1>Sign Up</h1>
                <label htmlFor="firstName">First Name: </label>
                <input type="text" id="firstName" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
                <br></br>
                <label htmlFor="lastName">Last Name: </label>
                <input type="text" id="lastName" onChange={(e) => setLastName(e.target.value)} value={lastName} />
                <br></br>
                <label htmlFor="email">Email: </label>
                <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                <br></br>
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                <br></br>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default Signup;