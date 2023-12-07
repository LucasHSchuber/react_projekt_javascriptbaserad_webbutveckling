// typically use the useEffect hook. The useEffect hook is used for side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM.
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';


function Sheets() {

    const [calculatedValues, setCalculatedValues] = useState({
        creditAssetsTotal: 0,
        debitAssetsTotal: 0,
        debitDebtTotal: 0,
        creditDebtTotal: 0,
    })
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
                console.log("Accounting data:", responseData);
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


    const generateSheet = () => {
        console.log("sheet genereated");
        document.getElementById("balancesheet").style.display = "block";

        //calculate debit TILLGÅNGAR
        const sumAssetsCredit = accountings.reduce((total, accounting) => {
            const credit = accounting.entries
                .filter(entry => entry.plan.startsWith("1"))
                .map(entry => entry.credit)

            const creditAssetsTotal = credit.reduce((sum, credit) => sum + credit, 0);

            console.log("credit ASSETS:", creditAssetsTotal);

            return total + creditAssetsTotal;

        }, 0)



        //calculate debit TILLGÅNGAR
        const sumAssetsDebit = accountings.reduce((total, accounting) => {
            const debit = accounting.entries
                .filter(entry => entry.plan.startsWith("1"))
                .map(entry => entry.debit)

            const debitAssetsTotal = debit.reduce((sum, debit) => sum + debit, 0);

            console.log("debit ASSETS:", debitAssetsTotal);

            return total + debitAssetsTotal;

        }, 0)

        //calculate debit SKULDER OCH EGET KAPITAL
        const sumDebtDebit = accountings.reduce((total, accounting) => {
            const debit = accounting.entries
                .filter(entry => entry.plan.startsWith("2"))
                .map(entry => entry.debit)

            const debitDebtTotal = debit.reduce((sum, debit) => sum + debit, 0);

            console.log("debit DEBT:", debitDebtTotal);

            return total + debitDebtTotal;

        }, 0)


        //calculate credit SKULDER OCH EGET KAPITAL
        const sumDebtCredit = accountings.reduce((total, accounting) => {
            const credit = accounting.entries
                .filter(entry => entry.plan.startsWith("2"))
                .map(entry => entry.credit)

            const creditDebtTotal = credit.reduce((sum, credit) => sum + credit, 0)

            console.log("credit DEBT:", creditDebtTotal);

            return total + creditDebtTotal;

        }, 0)



        setCalculatedValues({
            creditAssetsTotal: sumAssetsCredit,
            debitAssetsTotal: sumAssetsDebit,
            debitDebtTotal: sumDebtDebit,
            creditDebtTotal: sumDebtCredit,


        });

    }


    const showValues = () => {
        // Access the calculated values from the state
        console.log('Credit Assets Total:', calculatedValues.creditAssetsTotal);
        console.log('Debit Assets Total:', calculatedValues.debitAssetsTotal);
        console.log('Debit Debt Total:', calculatedValues.debitDebtTotal);
        console.log('Credit Debt Total:', calculatedValues.creditDebtTotal);

        calcTotal()
    };

    const calcTotal = () => {

            const nettoAssets = calculatedValues.debitAssetsTotal - calculatedValues.creditAssetsTotal;
            console.log("nettoASSETS: ", nettoAssets)

            const nettoDebt = calculatedValues.debitDebtTotal + calculatedValues.creditDebtTotal;
            console.log("nettoDEBT: ", nettoDebt)
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
                        onClick={generateSheet}
                    >
                        Generate
                    </Button>

                    <Button className="button my-3" onClick={showValues} type="button">
                        Show Values
                    </Button>


                    <div id='balancesheet'>
                        {accountings.map(item => (
                            <div key={item.id}>
                                {item.entries.map(entry => (
                                    <div key={entry._id}>
                                        <p>{entry.plan}</p>
                                    </div>
                                ))}
                                <p>{item.companyName}</p>
                            </div>
                        ))}
                    </div>




                </div>

            </div>
        </main >
    );
}
export default Sheets;
