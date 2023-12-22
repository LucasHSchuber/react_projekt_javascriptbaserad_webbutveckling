// typically use the useEffect hook. The useEffect hook is used for side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM.
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import Chatbot from '../../assets/js/Chatbot';
import PageAuth from '../../assets/js/pageAuth';



function ResultSheets() {

    PageAuth();

    return (
        <main className='py-5'>
            <div className='sheetswrapper'>
                <h2 className='pb-3'>Result sheets</h2>

                <div className='balancesheet mb-5'>
                    <p>
                        This financial statement provides information about a company's revenues and expenses over a specific period, usually a quarter or a year. The goal is to determine the net income or loss during that period.
                    </p>

                    <h6>Want to generate a result sheet?</h6>

                    <Button
                        className='button my-3'
                        // onClick={}
                        type='button'
                    >
                        Generate
                    </Button>


                    <div id='resultsheet' className='py-4'>


                        {/* 

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



                        </div> */}



                    </div>
                </div>

                <Chatbot />
            </div>
        </main >
    );
}
export default ResultSheets;
