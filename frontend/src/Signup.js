import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Signup () {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [gradYear, setGradYear]=useState('');

    const handleSignup = (e) => {
        e.preventDefault();
        const emailFirstChar = email.charAt(0);
        const firstNameFirstChar = firstName.charAt(0);
        const lastNameFirstChar = lastName.substring(0, 5);
        const emailChars2to6 = email.substring(1, 6);
        const split = email.split('@');
        //needs validation
        if (!email || !password || !firstName || !lastName) {
            alert('Please fill out all fields');
            return;
        }
        if (emailFirstChar.toLowerCase !== firstNameFirstChar.toLowerCase && emailChars2to6.toLowerCase !== lastNameFirstChar.toLowerCase) {
            window.location.reload()
            alert("first name and last name don't match email");
            return;
        }
        if (split[1] !== 'towson.edu' && split[1] !== 'students.towson.edu') {
            alert('Please use a Towson email');
            // window.location.reload();
            return;
        }
        fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstName, lastName, email, password, gradYear }),
        })
        .then((res) => {
            if (res.status === 200) {
                alert('Success, being rerouted to verify email');
                localStorage.setItem('email', email);
                //Change here
                fetch('/api/email/send', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email}),
                })
                .then(() => navigate('/verify'))
                //could replace to auth
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
                <label htmlFor="gradYear">Expected Graduation Year: </label>
                <input type="text" id="gradYear" onChange={(e) => setGradYear(e.target.value)} value={gradYear} />
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