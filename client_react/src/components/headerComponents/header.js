import React from 'react';
import { Link } from 'react-router-dom';


function Header() {
    return (
        <header className="">
            <div className="header d-flex">

                <div className="logo w-100">
                <Link to="/">LOGO</Link>
                </div>

                <nav>
                    <ul className="d-flex flex-row">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/test">Test</Link>
                        </li>
                        <li>
                            <Link to="/test">Test</Link>
                        </li>
                    </ul>
                </nav>

            </div>
        </header>
    );
}

export default Header;
