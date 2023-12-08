import React, { createContext, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import mImage from '../../assets/images/menubtn.png';
// import { useAuth } from '../../contexts/AuthContext';

function Header() {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);

  // display meny when hoovering over menu button logo
  const handleMouseOver = () => {
    setMenuVisible(true);
  };

  // toggle dropdown when hoovered
  const handleDropdownToggle = () => {
    console.log('Toggling dropdown visibility');
    setIsVisible(!isVisible);
  }
  // toggle dropdown when hoovered
  const handleDropdownToggle2 = () => {
    console.log('Toggling dropdown visibility');
    setIsVisible2(!isVisible2);
  }

  // Check if the user is logged in based on the presence of the token
  const isLoggedIn = sessionStorage.getItem('token') !== null;

  return (
    <header>
      <div className="header d-flex">
        <div className="logo">
          <Link to="/" onMouseOver={handleMouseOver}>
            <img src={mImage} alt='Logo button menu show' />
          </Link>
        </div>

        <nav>
          <ul className={`d-flex flex-row menulinks ${isMenuVisible ? 'menu-visible' : ''}`}>

            {/* Conditionally render other links based on authentication status */}
            {/* if there is a variable "isLoggedIn" then true, otherwise false */}
            {/* if isLoggedIn = true */}
            {isLoggedIn ? (
              <>
                {/* Links to show when the user is logged in */}
                <li className='menu-link'>
                  <Link to="/home">Home</Link>
                </li>
                {/* dropdown */}
                <li className="dropdown menu-link" onMouseEnter={handleDropdownToggle} onMouseLeave={handleDropdownToggle}>
                  <Link to="/newaccounting">Accounting</Link>
                  {isVisible && (

                    <ul className="dropdown-menu">
                      <li>
                        <Link to="/newaccounting">New Accounting</Link>
                      </li>
                      <li>
                        <Link to="/allaccountings">All Accountings</Link>
                      </li>
                      <li>
                        <Link to="/sheets">Sheets</Link>
                      </li>
                    </ul>

                  )}
                </li>


                {/* dropdown */}
                <li className="dropdown menu-link" onMouseEnter={handleDropdownToggle2} onMouseLeave={handleDropdownToggle2}>
                  <Link to="/invoice">Invoice</Link>
                  {isVisible2 && (

                    <ul className="dropdown-menu">
                      <li>
                        <Link to="/allinvoices">All invoices</Link>
                      </li>
                      <li>
                        <Link to="/managedinvoices">Managed invoices</Link>
                      </li>
                      <li>
                        <Link to="/unhandledinvoices">Unhandled invoices</Link>
                      </li>
                    </ul>

                  )}
                </li>

              </>
              /* if isLoggedIn = false */
            ) : (
              <>
                {/* Links to show when the user is not logged in */}
                <li className='menu-link'>
                  <Link to="/">Start</Link>
                </li>
                <li className='menu-link'>
                  <Link to="/createuser">Sign up</Link>
                </li>
                <li className='menu-link'>
                  <Link to="/login">Log in</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
