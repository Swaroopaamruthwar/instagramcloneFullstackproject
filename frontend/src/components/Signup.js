import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import '../login.css'
const Signup = () => {

  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password})
    });
    const json = await response.json()
    if (json.success) {
      localStorage.setItem('token', json.authToken);
      navigate("/login");
    }
    else {
      alert("invalid credentials")
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
          <h2 className="h2">Register</h2>
          <form onSubmit={handleSubmit} className="field" >
             <div className="line">
           <label htmlFor="name" className="col1 label">Name</label>
           <input type="text"  className="input col1" id="name" name="name" onChange={onChange} required />
        </div>
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

export default Signup


















































// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom';

// const Signup = (props) => {

//   const navigate = useNavigate();
//   const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { name, email, password } = credentials;
//     const response = await fetch('http://localhost:5000/register', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ name, email, password})
//     });
//     const json = await response.json()
//     if (json.success) {
//       localStorage.setItem('token', json.authToken);
//       navigate("/post");
//     }
//     else {
//       alert(json.success)
//     }
//   }

//   const onChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value })
//   }

//   return (
//     <div className="mt-2">
//       <h2>Create an account</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="name" className="form-label">Name</label>
//           <input type="text" className="form-control" id="name" name="name" onChange={onChange} required />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="email" className="form-label">Email address</label>
//           <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} required />
//           <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
//         </div>
//         <div className="mb-3">
//           <label htmlFor="password" className="form-label">Password</label>
//           <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required />
//         </div>
//         <button disabled={credentials.name.length < 5 || credentials.email.length < 5 || credentials.password.length < 5} type="submit" className="btn btn-primary">Submit</button>
//       </form>
//     </div>
//   )
// }

// export default Signup