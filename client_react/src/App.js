import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// components includes
import Header from "./components/headerComponents/header";
import Footer from "./components/footerComponents/footer";
import StartPage from "./components/mainComponents/StartPage";
import CreateUser from "./components/mainComponents/CreateUser";
import LogIn from "./components/mainComponents/LogIn";
import HomePage from "./components/mainComponents/HomePage";
import NewAccounting from "./components/mainComponents/NewAccounting";


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
            <Route path="/" element={<StartPage />} />
            <Route path="/createuser" element={<CreateUser />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/newaccounting" element={<NewAccounting />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
    </div>
  );
}

export default App;
