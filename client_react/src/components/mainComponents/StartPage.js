
// typically use the useEffect hook. The useEffect hook is used for side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM.
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function StartPage() {

    return (
        <main className='py-5'>
            <div className='startpage'>

                <h1>Artificial Intellegence <br></br><span>Accounting System</span></h1>

                <div className='my-5'>
                    <button className='button'>Sign in</button>

                    <Link to="/createuser"> <li className='mt-4'>Create a new account?</li></Link>
                </div>

            </div>
        </main>
    );
}

export default StartPage;
