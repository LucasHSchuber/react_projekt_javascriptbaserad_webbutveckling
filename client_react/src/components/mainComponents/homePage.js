// typically use the useEffect hook. The useEffect hook is used for side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM.
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import fetchUser from '../../assets/js/fetchUser';
import chatbotImg from '../../assets/images/chatbot.png';

function HomePage() {

    const [name, setUserName] = useState(null);
    const [company, setUserCompany] = useState(null);


    // useEffect hook to run fetchUser when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await fetchUser();
                setUserName(userData.name);
                setUserCompany(userData.company);
            } catch (error) {
                console.error("Error in fetchData:", error.message);
                // Handle error as needed
            }
        };

        fetchData();
    }, []); // The empty dependency array [] ensures that this effect runs only once when the component mounts


    const openChatbot = () => {
        console.log("open chatbot");

        const chatbotElement = document.getElementById("show-chatbot");

        if (chatbotElement.style.display === "" || chatbotElement.style.display === "none") {
            chatbotElement.style.display = "block";
        } else {
            chatbotElement.style.display = "none";
        }
    };

    const closeChatbot = () => {
        const chatbotElement = document.getElementById("show-chatbot");
        chatbotElement.style.display = "none";
    };

    const answerChatbot = () => {
        console.log("choice made");
    }


    return (
        <main className='py-5'>
            <div className='homepage'>

                <h1>Welcome <br></br><span>{name}</span></h1>
                <h6>Company: {company}</h6>



                <div className='chatbot' id="show-chatbot">
                    <div className='header-chatbot d-flex'>
                        <div className='d-flex w-100'>
                            <img src={chatbotImg} alt='chatbot img' />
                            <h6 className='ml-3'>AI Chatbot</h6>
                        </div>
                        <div className='flex-shrink-1'>
                            <a
                                onClick={closeChatbot}
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
                                <select>
                                    <option value="" disabled selected hidden>Select an option</option>
                                    <option value="option1">Option 1</option>
                                    <option value="option2">Option 2</option>
                                    <option value="option3">Option 3</option>
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

            </div>

        </main >


    );
}

export default HomePage;
