// typically use the useEffect hook. The useEffect hook is used for side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM.
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';


function Sheets() {


    const [accountings, setAccountings] = useState([]);


    const getAllAccountings = async () => {

        const token = sessionStorage.getItem('token');

        try {
            const response = await fetch("http://localhost:5000/accountings", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            if (response.ok) {
                const responseData = await response.json();
                // console.log("Accounting data:", responseData);
                setAccountings(responseData);

            } else {
                const responseData = await response.json();
                console.log("Error:", responseData.message);
                console.log("Error:", response.status, response.statusText, response.message);

            }

        } catch (error) {
            console.log("Error fetching accountings: ", error.message);
            throw error;

        }
    }


    useEffect(() => {
        getAllAccountings();
    }, []);


    return (
        <main className='py-5'>
            <div className='sheetswrapper'>
                <h2 className='pb-3'>Balance sheets</h2>

                <div className='balancesheet mb-5'>
                    <p>
                        A balance sheet is a financial statement that provides a snapshot of
                        a company's financial position at a specific point in time. It is one
                        of the fundamental financial statements, alongside the income
                        statement, cash flow statement, and statement of changes in equity.
                        The balance sheet follows the accounting equation:
                    </p>
                    <p style={{ fontStyle: "italic", fontWeight: "bold" }}>Assets = Liabilities + Equity</p>
                    <h6>Want to genereate a balance sheet?</h6>

                    <Button
                        className='button my-3'
                        // onClick={}
                        type='button'
                    >
                        Generate
                    </Button>

                </div>

            </div>
        </main>
    );
}


export default Sheets;
