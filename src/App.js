// // import logo from './logo.svg';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import './App.css';
// import Home from './Pages/Home';
// import Login from './Pages/Login';


// function App() {
//   return (
//     <>
//     <BrowserRouter>
//     <Routes>
//         <Route path="/" element={<Login />} />
//       </Routes>
//       <Routes>
//         <Route path="/Home" element={<Home />} />
//       </Routes>
//     </BrowserRouter>
//     </>
//   );
// }

// export default App;

// App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import { auth } from './firebase';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import { app } from './firebase';
import { getAuth } from 'firebase/auth';



const auth = getAuth(app);


const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

//  const [user, setUser] = useState(null);

//  useEffect(() => {
//    const unsubscribe = auth.onAuthStateChanged((authUser) => {
//      if (authUser) {
//        setUser(authUser);
//      } else {
//        setUser(null);
//      }
//    });

//    return () => {
//      unsubscribe();
//    };
//  }, []);

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
