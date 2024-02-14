// RegisterForm.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import '../MyCss/Register.css'; // Import your CSS file
import { app } from '../firebase';
import { useNavigate } from 'react-router-dom';


const auth = getAuth(app)

const RegisterForm = () => {
  const navigator = useNavigate()


  const createUser = () =>{
    createUserWithEmailAndPassword(auth,email,password)
    navigator("/")
  }

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Register</h2>
        <form>
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" onClick={createUser}>Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
