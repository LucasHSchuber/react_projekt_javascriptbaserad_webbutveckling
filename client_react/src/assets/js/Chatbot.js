import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import chatbotImg from '../../assets/images/chatbot.png';

//chatbot
function Chatbot() {


    const [showSpinner, setShowSpinner] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);

    const [selectedOption, setSelectedOption] = useState("");
    const [answer, setAnswer] = useState("");


    const openChatbot = () => {
        console.log("open chatbot");

        const chatbotElement = document.getElementById("show-chatbot");
        const buttonElement = document.getElementById("button-openChatbot");


        if (chatbotElement.style.display === "" || chatbotElement.style.display === "none") {
            chatbotElement.style.display = "block";
            buttonElement.style.right = "2.5em";
            buttonElement.style.backgroundColor = "#78BEFF";
        } else {
            chatbotElement.style.display = "none";
            buttonElement.style.right = "2em";
            buttonElement.style.backgroundColor = "#EDEDED";
        }
    };

    //triggers when chatbot ok button is pressed 
    const answerChatbot = () => {

        const userinput = document.getElementById("userinput");
        const selection = document.getElementById("selection");

        userinput.style.display = "block";
        selection.style.display = "none";

        setShowSpinner(true);

        //generates the different answers depending on users questions
        if (selectedOption === "What is accounting?") {
            let string = "Accounting is the process of recording, summarizing, analyzing, and reporting financial transactions of a business or organization. It involves the systematic and comprehensive recording of financial activities, ensuring that all financial information is accurate, complete, and in compliance with accounting standards and regulations";
            setAnswer(string);
        } else if (selectedOption === "How should I account a sale?") {
            let string = "Debit: Ex, 1930 - bank account \n Credit: Ex, 3010 - sales \n Credit: Ex, 2610 - VAT \n Make sure that the credit posts has the same totalt amount as credit posts.";
            setAnswer(string);
        }

        setTimeout(() => {
            setShowSpinner(false);
            setShowAnswer(true);
        }, 1500)

    }


    return (
        <main >

            <div className='chatbot' id="show-chatbot">
                <div className='header-chatbot d-flex'>
                    <div className='d-flex w-100'>
                        <img src={chatbotImg} alt='chatbot img' />
                        <h6 className='ml-3'>AI Chatbot</h6>
                    </div>
                    <div className='flex-shrink-1'>
                        <a
                            onClick={openChatbot}
                        >
                            <i class=" close-chatbot fa-2x fa-solid fa-minus"></i>
                        </a>
                    </div>
                </div>
                <div className='main-chatbot'>
                    <div >
                        <div className='intro-message d-flex'>
                            <img src={chatbotImg} alt='chatbot img' className='mr-3' />
                            <div>
                                <p>Hello there!</p>
                            </div>
                        </div>
                        <div className='ml-5 selection-message'>
                            <p>What can i assist you with?</p>
                            <div id="selection">
                                <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} >
                                    <option value="" disabled selected hidden>Select an option</option>
                                    <option value="What is accounting?">What is accounting?</option>
                                    <option value="How should I account a sale?">How should I account a sale?</option>
                                    <option value="Why can't I edit the verifications?">Why can't I edit the verifications?</option>
                                    <option value="Do you have any open positions?">Do you have any open positions?</option>
                                </select>
                                <button
                                    className='button-ok-chatbot'
                                    onClick={answerChatbot}
                                    type="button"
                                >
                                    Ok
                                </button>
                            </div>
                        </div>

                        <div className='userinput-chatbot' id="userinput">
                            <p>{selectedOption}</p>
                        </div>
                        {showSpinner && (
                            <div class="spinner-border" role="status" id="spinner">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        )}

                        {showAnswer && (

                            <div className='respone-chatbot d-flex'>
                                <img src={chatbotImg} alt='chatbot img' className='mr-3' />
                                <div>
                                    <p>{answer}</p>
                                </div>
                            </div>


                        )}

                    </div>
                </div>
                <div className='footer-chatbot'>
                    <h6>Choose an alternative</h6>
                </div>

            </div>

            <div>
                <button
                    className='button-chatbot'
                    id='button-openChatbot'
                    onClick={openChatbot}
                >
                    <img src={chatbotImg} alt='chatbot img' />
                </button>
            </div>
        </main >


    );
}

export default Chatbot;