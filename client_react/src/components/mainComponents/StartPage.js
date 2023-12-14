
// typically use the useEffect hook. The useEffect hook is used for side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM.
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../../assets/images/aiface.png';



function StartPage() {

    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 772);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 772);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const startPageStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: isSmallScreen ? '120% auto' : ' 95% auto',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    };


    return (
        <main className='pt-5' style={startPageStyle}>
            <div className='startpage'>

                <h1>Artificial Intellegence <br></br><span>Accounting System</span></h1>

                <div className='my-5'>
                    <button className='button'>
                        <Link to="/login" style={{ color: "white" }}>
                            Sign in
                        </Link>
                    </button>


                    <Link to="/createuser"> <li className='mt-4'>Create a new account?</li></Link>
                </div>

            </div>
        </main>
    );
}

export default StartPage;
