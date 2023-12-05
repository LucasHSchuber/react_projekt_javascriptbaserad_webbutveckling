import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import mImage from '../../assets/images/menubtn.png';

function Header() {
  const [isMenuVisible, setMenuVisible] = useState(false);

  const handleMouseOver = () => {
    console.log("Being hovered");
    setMenuVisible(true);
  };

 
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
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/createuser">New user</Link>
            </li>
            <li>
              <Link to="/login">Log in</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
