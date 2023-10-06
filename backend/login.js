import React, {useEffect, useState} from "react"
//import axios from "axios" //not axios (twice) need to be changed
import { useNavigate, Link} from "react-router-dom"

function Login() {

    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')

    async function submit(e){
        e.preventDefault();

        try{
           // await axios.post("ENTER URL HERE", email, password) //not axios 
        }

        catch{
            console.log(e);
        }
    }


    return(

        <div className = "Login">

            <h1>Login</h1>

            <form action="Post">
                <input type = "email" onChange = {(e)=>{setEmail(e.target.values)}} placeholder = "Email" name = "" id= ""/>
                <input type = "password" onChange = {(e)=>{setPassword(e.target.values)}} placeholder = "Password" name = "" id= ""/>
                <input type= "Submit" onClick={submit} />

            </form>
            <br />
            <p>or</p>
            <br/>

            <Link to="/Signup">Signup Page</Link>

        </div>
        
    )
}

export default Login