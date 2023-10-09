import React, {useEffect, useState} from "react"
//import axios from "axios" //not axios (twice) need to be changed
import { useNavigate, Link} from "react-router-dom"

function Login() {

    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')

    const submit = async (e) => {
        e.preventDefault();
        await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
        .then((res) => {
            if (res.status === 400) {
                alert('User does not exist');
                console.log('User does not exist');
                return res.json();
            }
            else if (res.status === 401) {
                alert('Incorrect password');
                console.log('Incorrect password');
                return res.json();
            }
            else if (res.status === 200) {
                alert('Success');
                console.log('Success');
                return res.json();
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
            <h1>Login</h1>
            <form method="POST" onSubmit={submit}>
                <input type = "email" onChange = {(e)=>{setEmail(e.target.value)}} placeholder = "Email" id= "email"/>
                <input type = "password" onChange = {(e)=>{setPassword(e.target.value)}} placeholder = "Password" id= "password"/>
                <button type="submit">Submit</button>
            </form>
            <br />
            <p>or</p>
            <br/>
            <Link to="/Signup">Signup Page</Link>

        </div>
        
    )
}

export default Login