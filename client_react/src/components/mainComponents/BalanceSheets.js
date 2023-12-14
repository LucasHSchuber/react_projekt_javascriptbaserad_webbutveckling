// typically use the useEffect hook. The useEffect hook is used for side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM.
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import Calculations from '../../assets/js/Calculations';
import Chatbot from '../../assets/js/Chatbot';



function BalanceSheets() {

    const [calculatedValues, setCalculatedValues] = useState({
        creditAssetsTotal: 0,
        debitAssetsTotal: 0,
        debitDebtTotal: 0,
        creditDebtTotal: 0,
        creditIncomeTotal: 0,
        debitCostsTotal: 0,

    })
    const [assets, setAssets] = useState("");
    const [debts, setDebts] = useState("");
    const [result, setResult] = useState("");

    const [debit1930, set1930Debit] = useState("");
    const [credit1930, set1930Credit] = useState("");

    const [value, setValue] = useState("");

    const [accountings, setAccountings] = useState([]);


    const getAllAccountings = async () => {

        const token = sessionStorage.getItem('token');
        const userId = sessionStorage.getItem('userid');

        try {
            const response = await fetch(`http://localhost:5000/accountings/acc?userId=${userId}`, {
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

        //calculate credit TILLGÅNGAR
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


        //calculate INCOME/INTÄKTER
        const sumCreditIncome = accountings.reduce((total, accounting) => {
            const credit = accounting.entries
                .filter(entry => entry.plan.startsWith("3"))
                .map(entry => entry.credit)

            const creditIncomeTotal = credit.reduce((sum, credit) => sum + credit, 0);

            console.log("credit INCOME:", creditIncomeTotal);

            return total + creditIncomeTotal;

        }, 0)

        //calculate COSTS/KOSTNADER OCH UTGIFTER
        const sumDebitCosts = accountings.reduce((total, accounting) => {
            const debit = accounting.entries
                .filter(entry => ["4", "5"].some(prefix => entry.plan.startsWith(prefix)))
                .map(entry => entry.debit)

            const debitCostsTotal = debit.reduce((sum, debit) => sum + debit, 0);

            console.log("debit COSTS:", debitCostsTotal);

            return total + debitCostsTotal;

        }, 0)



        const calcCredit1930 = () => {
            // Filter and sum the "credit" values where "plan" starts with "1930"
            const Credit1930 = accountings.reduce((sum, entry) => {
                return sum + entry.entries.filter(e => e.plan.startsWith('1930')).reduce((subSum, e) => subSum + e.credit, 0);
            }, 0);

            set1930Credit(Credit1930); // Assuming setValue is a function for updating state
            console.log(Credit1930);
            return Credit1930;
        };
        const calcDebit1930 = () => {
            // Filter and sum the "credit" values where "plan" starts with "1930"
            const Debit1930 = accountings.reduce((sum, entry) => {
                return sum + entry.entries.filter(e => e.plan.startsWith('1930')).reduce((subSum, e) => subSum + e.debit, 0);
            }, 0);

            set1930Debit(Debit1930); // Assuming setValue is a function for updating state
            console.log(Debit1930);
            return Debit1930;
        };



        setCalculatedValues({
            creditAssetsTotal: sumAssetsCredit,
            debitAssetsTotal: sumAssetsDebit,
            debitDebtTotal: sumDebtDebit,
            creditDebtTotal: sumDebtCredit,
            creditIncomeTotal: sumCreditIncome,
            debitCostsTotal: sumDebitCosts,
        });


        calcCredit1930();
        calcDebit1930();


    }


    const showValues = () => {
        // Access the calculated values from the state
        console.log('Credit Assets Total:', calculatedValues.creditAssetsTotal);
        console.log('Debit Assets Total:', calculatedValues.debitAssetsTotal);
        console.log('Debit Debt Total:', calculatedValues.debitDebtTotal);
        console.log('Credit Debt Total:', calculatedValues.creditDebtTotal);
        console.log('Credit Income Total:', calculatedValues.creditIncomeTotal);
        console.log('Debit Costs Total:', calculatedValues.debitCostsTotal);

        calcTotal()
    };

    const calcTotal = () => {

        const nettoAssets = calculatedValues.debitAssetsTotal - calculatedValues.creditAssetsTotal;
        setAssets(nettoAssets);
        console.log("nettoASSETS: ", nettoAssets);

        const nettoDebt = calculatedValues.debitDebtTotal + calculatedValues.creditDebtTotal;
        setDebts(nettoDebt);
        console.log("nettoDEBT: ", nettoDebt);

        const result = calculatedValues.creditIncomeTotal - calculatedValues.debitCostsTotal;
        setResult(result);
        console.log("result: ", result);
    }

    useEffect(() => {
        showValues();
    }, [calculatedValues]);

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

                    {/* <Button className="button my-3" onClick={showValues} type="button">
                        Show Values
                    </Button> */}


                    <div id='balancesheet' className='py-4'>

                        {/* <div class="">
                            {accountings.map(accounting => (
                                <div key={accounting.id}>
                                    {accounting.entries
                                        .filter(entry => entry.plan.startsWith("1"))
                                        .map(entry => (
                                            // Render your entry here
                                            <div key={entry._id}>
                                                <p>{entry.plan}</p>
                                            </div>

                                        ))}
                                </div>
                            ))}
                        </div> */}


                        <div className="balance-sheet-container">
                            <h2>Balance Sheet</h2>

                            <div className="section">
                                <h3>Assets</h3>

                                <div className="asset-category">
                                    <p ><span>Current Assets</span></p>
                                    <div className="d-flex justify-content-between">
                                        <p>1930 - bankkonto</p>
                                        <p>{debit1930 - credit1930}</p>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <h6>Total Assets</h6>
                                    <p style={{ fontWeight: "800" }}>{assets}</p>
                                </div>
                            </div>

                            <hr className='hr'></hr>

                            <div className="section">
                                <h3>Debts & Capital</h3>

                                <div className="capital-category">
                                    <p><span>Equity</span></p>
                                    <div className="d-flex justify-content-between">
                                        <p>2512 - årets resultat</p>
                                        <p>{result}</p>
                                    </div>
                                </div>

                                <div className="debt-category">
                                    <p><span>Liabilities</span></p>
                                    <div className="d-flex justify-content-between">
                                        <p>Annat</p>
                                        <p>{debts}</p>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <h6>Total Equity & Liabilities</h6>
                                    <p style={{ fontWeight: "800" }}>{debts + result}</p>

                                </div>
                            </div>

                            <hr className='hr'></hr>

                            <div className="section">
                                <div className="d-flex justify-content-between">
                                    <h6>Balance:</h6>
                                    <p>{(debts + result === assets ? <i style={{ color: "#16d616" }} class="fa-solid fa-2x fa-check" ></i> : <i style={{ color: "red" }} class="fa-solid fa-2x fa-check" ></i>)}</p>
                                </div>
                            </div>



                        </div>



                    </div>
                </div>

                <Chatbot />
            </div>
        </main >
    );
}
export default BalanceSheets;
