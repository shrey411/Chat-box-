// LoginForm.js
import React, { useState } from 'react';
// import { auth } from './firebase';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import '../MyCss/Login.css'; // Import your CSS file
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebase';


const auth = getAuth(app)


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const Navigate = useNavigate()

  const  signInPage =  async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential)
      // alert("Sign-in successful");
      Navigate("/home")
      
    } catch (err) {
      alert("email or password is not register")
      console.error("Sign-in error:", err.code, err.message);
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login Chat-Box</h2>
        <form >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" onClick={()=>signInPage()}>Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
