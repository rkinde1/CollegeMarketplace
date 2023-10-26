import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function OTPInput() {
    const [email, setEmail] = useState('');
    const [otp, setOTP] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        setEmail(localStorage.getItem('email'));
        e.preventDefault();
        fetch('/api/email/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, otp: otp }),
        })
        .then((res) => {
            if (res.status === 200) {
                alert('Success');
                console.log('Success');
                navigate('/login');
                return res.json();
            } else if (res.status === 400) {
                alert('Incorrect OTP');
                console.log('Incorrect OTP');
            }
        })

    }

    const handleResend = (e) => {
        e.preventDefault();
        fetch('/api/email/reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email}),
        })
        .then((res) => {
            if (res.status === 200) {
                alert("OTP reset");
                fetch('/api/email/send', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email}),
                })
                .then((res) => alert("Email has been sent"))
                .catch ((error) => {
                    alert(error);
                })
            }
        });
    }
    return (
        <div>
            <h1>Verify Email</h1> 
            <p>Enter the OTP sent to your email</p>
                <form onSubmit={handleSubmit}>
                    <input type="number" onChange={(e) => setOTP(e.target.value)}></input>
                    <button type="submit">Submit</button>
                </form>
            <br />
            <p>or</p>
            <br/>
            <form onSubmit={handleResend}>
                <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="email"></input>
                <button type="submit">Resend OTP</button>
            </form>
        </div>
    )
}

export default OTPInput;