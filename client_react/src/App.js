import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// components includes
import Header from "./components/headerComponents/header";
import Footer from "./components/footerComponents/footer";
import HomePage from "./components/mainComponents/HomePage";
import CreateUser from "./components/mainComponents/CreateUser";
import LogIn from "./components/mainComponents/LogIn";


// css imports
import "./assets/css/main.css";


function App() {
  return (
    <div className="gradient-container">
    <Router>
      <div className="App">
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/createuser" element={<CreateUser />} />
            <Route path="/login" element={<LogIn />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
    </div>
  );
}

export default App;
