
// typically use the useEffect hook. The useEffect hook is used for side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM.
import React, { useEffect, useState } from 'react';


function Home() {

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

    // Call the fetchData function when the component mounts
    useEffect(() => {
        fetchData();
    }, []);


    return (
        <main>
            <section>
                <h1>Courses</h1>
                <ul id="courseslist">
                    {courses.map(course => (
                        <li key={course._id}>{course.courseName}</li>
                    ))}
                </ul>
            </section>
            <section>

            </section>
        </main>
    );
}

export default Home;
