import React, { createContext, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import mImage from '../../assets/images/menubtn.png';
// import { useAuth } from '../../contexts/AuthContext';

function Header() {
  const [isMenuVisible, setMenuVisible] = useState(false);

  const handleMouseOver = () => {
    setMenuVisible(true);
  };

  // Check if the user is logged in based on the presence of the token
  const isLoggedIn = sessionStorage.getItem('token') !== null;

  return (
    <header>
      <div className="header d-flex">
        <div className="logo">
          <Link to="/" onMouseOver={handleMouseOver}>
            <img src={mImage} alt='Menu Button' />
          </Link>
        </div>

        <nav>
          <ul className={`d-flex flex-row menulinks ${isMenuVisible ? 'menu-visible' : ''}`}>

            {/* Conditionally render the "Home" link */}


            {/* Conditionally render other links based on authentication status */}
            {isLoggedIn ? (
              <>
                {/* Links to show when the user is logged in */}
                <li>
                  <Link to="/home">Home</Link>
                </li>
                <li>
                  <Link to="/newaccounting">Accounting</Link>
                </li>
                <li>
                  <Link to="/invoice">Invoice</Link>
                </li>
              </>
            ) : (
              <>
                {/* Links to show when the user is not logged in */}
                <li>
                  <Link to="/">Start</Link>
                </li>
                <li>
                  <Link to="/createuser">Sign up</Link>
                </li>
                <li>
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
