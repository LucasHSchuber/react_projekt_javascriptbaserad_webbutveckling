import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// components includes
import Header from "./components/headerComponents/header";
import Footer from "./components/footerComponents/footer";
import Home from "./components/mainComponents/homePage";
import Test from "./components/mainComponents/test";


// css imports
import "./assets/css/main.css";


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
