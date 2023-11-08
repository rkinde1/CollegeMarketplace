import React from 'react'
import { useState } from "react";
import {useNavigate} from 'react-router-dom'

function ForgotPassword() {
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()
        await fetch('/api/forgot-password/sendEmail', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        })
        .then((res) => {
          if (res.status === 200) {
            alert('Success');
            navigate('/login')
          } 
          else if (res.status === 500) {
            alert('Failed');
            alert(res.status);
          }
          else {
            alert(res.status);
          }
        })     
    }
    return(
      <div>
        <h4>Forgot Password</h4>
        <form onSubmit={handleSubmit} method="POST">
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              id="email"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Send
          </button>
        </form>
      </div>
    )
}

export default ForgotPassword