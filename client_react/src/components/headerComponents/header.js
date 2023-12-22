import React, { createContext, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

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

  const logoutUser = () => {


    const token = sessionStorage.getItem('token');
    const user = sessionStorage.getItem('userid');
    console.log(token + " has been removed from session storage");
    console.log(user + " has been removed from session storage");
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userid');

  }

  // Check if the user is logged in based on the presence of the token
  const isLoggedIn = sessionStorage.getItem('token') !== null;

  return (
    <header>
      <div className="header">
        <Navbar expand="lg">
          {/* <div className="logo">
            {isLoggedIn ? (
              <Link to="/home" onMouseOver={handleMouseOver}>
                <img src={mImage} alt='Logo button menu show' />
              </Link>
            ) : (
              <Link to="/" onMouseOver={handleMouseOver}>
                <img src={mImage} alt='Logo button menu show' />
              </Link>
            )}
          </div> */}
          <div className="logo">
            {isLoggedIn ? (
              <Link to="/home" >
                <img src={mImage} alt='Logo button menu show' />
              </Link>
            ) : (
              <Link to="/">
                <img src={mImage} alt='Logo button menu show' />
              </Link>
            )}
          </div>
          <Navbar.Toggle className="toogle-icon" aria-controls="navbarSupportedContent" />
          <Navbar.Collapse id="navbarSupportedContent">

            <Nav className={`menulinks ${isMenuVisible ? 'menu-visible' : ''}`}>
              {/* Conditionally render other links based on authentication status */}
              {isLoggedIn ? (
                <>
                  {/* Links to show when the user is logged in */}
                  <Nav.Link as={Link} to="/home" className='menu-link mt-lg-5 mr-lg-5 mr-sm-2'>
                    Home
                  </Nav.Link>
                  {/* dropdown */}
                  <NavDropdown
                    id="accounting-dropdown"
                    className='menu-link accounting-dropdown'
                    onMouseEnter={handleDropdownToggle}
                    onMouseLeave={handleDropdownToggle}
                    title={(
                      <span style={{ color: 'white' }}>
                        Accounting
                      </span>
                    )}
                  >
                    <div className='dropdown-box'>
                      <NavDropdown.Item as={Link} to="/newaccounting" className="dropdown-link">
                        New Accounting
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/allaccountings" className="dropdown-link">
                        All Accountings
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/balancesheets" className="dropdown-link">
                        Balance sheets
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/resultsheets" className="dropdown-link">
                        Result sheets
                      </NavDropdown.Item>
                    </div>
                  </NavDropdown>


                  {/* dropdown */}
                  <NavDropdown
                    title={(
                      <span style={{ color: 'white' }}>
                        Invoice
                      </span>
                    )}
                    id="basic-nav-dropdown"
                    className=' menu-link'
                    onMouseEnter={handleDropdownToggle2}
                    onMouseLeave={handleDropdownToggle2}
                  >
                    <div className='dropdown-box'>
                      <NavDropdown.Item as={Link} to="/allinvoices"  className="dropdown-link">
                        All invoices
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/managedinvoices"  className="dropdown-link">
                        Managed invoices
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/unhandledinvoices"  className="dropdown-link">
                        Unhandled invoices
                      </NavDropdown.Item>
                    </div>
                  </NavDropdown>

                  {/* dropdown */}
                  <NavDropdown
                    title={(
                      <span style={{ color: 'white' }}>
                        User
                      </span>
                    )}
                    id="basic-nav-dropdown"
                    className=' menu-link'
                    onMouseEnter={handleDropdownToggle2}
                    onMouseLeave={handleDropdownToggle2}
                  >
                    <div className='dropdown-box'>
                      <NavDropdown.Item as={Link} to="/usersettings"  className="dropdown-link">
                        User settings
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/" onClick={logoutUser}  className="dropdown-link">
                        Log out
                      </NavDropdown.Item>
                    </div>
                  </NavDropdown>
                </>
              ) : (
                <>
                  {/* Links to show when the user is not logged in */}
                  <Nav.Link as={Link} to="/" className='menu-link mt-5 mr-5 ml-5'>
                    Start
                  </Nav.Link>
                  <Nav.Link as={Link} to="/createuser" className='menu-link mt-5 mr-5 ml-5'>
                    Sign up
                  </Nav.Link>
                  <Nav.Link as={Link} to="/login" className='menu-link mt-5 mr-5 ml-5'>
                    Log in
                  </Nav.Link>
                </>
              )}
            </Nav>


          </Navbar.Collapse>
        </Navbar>
      </div>
    </header>
  );
}

export default Header;
