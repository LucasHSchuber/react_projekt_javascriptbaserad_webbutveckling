import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// components includes
import Header from "./components/headerComponents/header";
import Footer from "./components/footerComponents/footer";
import StartPage from "./components/mainComponents/StartPage";
import CreateUser from "./components/mainComponents/CreateUser";
import LogIn from "./components/mainComponents/LogIn";

import NewAccounting from "./components/mainComponents/NewAccounting";
import AllAccountings from "./components/mainComponents/AllAccountings";
import BalanceSheets from "./components/mainComponents/BalanceSheets";
import ResultSheets from "./components/mainComponents/ResultSheets";
import HomePage from "./components/mainComponents/HomePage"
import UserSettings from "./components/mainComponents/UserSettings"


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
              <Route path="/allaccountings" element={<AllAccountings />} />
              <Route path="/balancesheets" element={<BalanceSheets />} />
              <Route path="/resultsheets" element={<ResultSheets />} />
              <Route path="/usersettings" element={<UserSettings />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
