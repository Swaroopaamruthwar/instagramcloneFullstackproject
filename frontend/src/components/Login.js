import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../login.css'
import Navbar from './Navbar';
const Login = () => {

  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json()
    if (json.success) {
      localStorage.setItem('token', json.authToken);
      navigate("/post");
    }
    else {
      alert("Invalid Details")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (

    <div className="html">
      <Navbar />
      <div className="body2">
        <div className="container2">
          <h2 className="h2">Login</h2>
          <form onSubmit={handleSubmit} className="field" >
            <div className="line">
              <label htmlFor="email" className="col1 label">Email address</label>
              <input type="email" className="input col1" id="email" name="email" value={credentials.email} aria-describedby="emailHelp" onChange={onChange} required />

            </div>
            <div className="line">
              <label htmlFor="password" className="col1 label" >Password</label>
              <input type="password" id="password" className="input col1" name="password" value={credentials.password} onChange={onChange} minLength={5} required />
            </div>
            <button disabled={credentials.email.length < 5 || credentials.password.length < 5} type="submit" className="batton" >Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login