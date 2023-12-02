
// typically use the useEffect hook. The useEffect hook is used for side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM.
import React, { useEffect, useState } from 'react';


function Home() {

    //----------
    // GET POSTS
    //----------

    // State to store the fetched data
    const [courses, setCourses] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:5000/courses");

            if (response.ok) {
                const data = await response.json();
                setCourses(data);
            } else {
                console.error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    //----------
    // ADD POST
    //----------
    const [courseId, setCourseId] = useState('');
    const [courseName, setCourseName] = useState('');
    const [coursePeriod, setCoursePeriod] = useState('');
    const [messageId, setMessageId] = useState('');
    const [messageName, setMessageName] = useState('');
    const [messagePeriod, setMessagePeriod] = useState('');

    const addCourse = async (e) => {
        e.preventDefault(); // Prevents the default form submission

        const data = {
            courseId: courseId,
            courseName: courseName,
            coursePeriod: coursePeriod
        }

        //clear all message field
        setMessageId(" ");
        setMessageName(" ");
        setMessagePeriod(" ");

        //if fields are empty
        if (courseId.length == 0) {
            setMessageId("Course ID cannot be empty");
        }
        if (courseName.length == 0) {
            setMessageName("Course Name cannot be empty");
        }
        if (coursePeriod.length == 0) {
            setMessagePeriod("Course Period cannot be empty");
        }

        //sent POST 
        try {
            const response = await fetch("http://localhost:5000/courses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                console.log("Data stored in mongodb");

                fetchData();

            } else {
                console.log("Error when storing data in mongodb:", response.status, response.statusText);
            }

        } catch (error) {
            console.error('Error adding course:', error.message);
        }
    }

    // Call the fetchData function when the component mounts
    useEffect(() => {
        fetchData();
    }, []);


    return (
        <main className='py-5'>
            <section>
                <h1>Courses</h1>
                <ul id="courseslist">
                    {courses.map(course => (
                        <li key={course._id}>{course.courseName}</li>
                    ))}
                </ul>
            </section>
            <section>

                <form className="py-4">
                    <div className="form-group">
                        <div style={{ display: 'flex' }}>
                            <label htmlFor="courseId" className="px-2">
                                Course ID:
                            </label>
                            <p id="message_id" className="error">
                                {messageId}
                            </p>
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            id="courseId"
                            placeholder="Enter Course ID"
                            value={courseId}
                            onChange={(e) => setCourseId(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <div style={{ display: 'flex' }}>
                            <label htmlFor="courseName" className="px-2">
                                Course Name:
                            </label>
                            <p id="message_name" className="error">
                                {messageName}
                            </p>
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            id="courseName"
                            placeholder="Enter Course Name"
                            value={courseName}
                            onChange={(e) => setCourseName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <div style={{ display: 'flex' }}>
                            <label htmlFor="coursePeriod" className="px-2">
                                Course Period:
                            </label>
                            <p id="message_period" className="error">
                                {messagePeriod}
                            </p>
                        </div>
                        <input
                            type="number"
                            className="form-control"
                            id="coursePeriod"
                            placeholder="Enter Course Period"
                            value={coursePeriod}
                            onChange={(e) => setCoursePeriod(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" onClick={addCourse} className="submit-btn">
                        Add course
                    </button>
                </form>

            </section>
        </main>
    );
}

export default Home;
