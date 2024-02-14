
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';


const App = () => {


  return (
    <Router>
      <Routes>
      {/* <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />}
        /> */}
        <Route
          path="/"
          element={ <Login />}
        />
        <Route
          path="/home"
          element={ <Home /> }
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
