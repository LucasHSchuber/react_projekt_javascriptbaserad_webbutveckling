import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import { useMediaQuery } from '@react-hook/media-query';

//charts
const ChartComponent = () => {

    const isSmallScreen = useMediaQuery('(max-width: 772px)');

    const [accountingsData, setAccountingsData] = useState([]);

    //get the accountings from db
    useEffect(() => {
        const fetchData = async () => {
            const token = sessionStorage.getItem('token');
            const userId = sessionStorage.getItem('userid');

            try {
                const response = await axios.get(`http://localhost:5000/accountings/acc?userId=${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setAccountingsData(response.data);
            } catch (error) {
                console.error('Error fetching accountings:', error.message);
            }
        };

        fetchData();
    }, []);

    // Process data to group and sum amounts for each date
    const groupedData = accountingsData.reduce((result, entry) => {
        const date = entry.created_at.substring(0, 10);

        if (result[date]) {
            result[date].amount += 1;
        } else {
            result[date] = {
                date,
                amount: 1,
            };
        }

        return result;
    }, {});

    const processedData = Object.values(groupedData);




    return (
        <div className={`chart-container d-flex justify-content-center ${isSmallScreen ? 'small-screen' : ''}`}>
            <div>
                <h5>Amount of accountings per date</h5>
                <p>The chart shows the amount of accountings that have been made a specific date</p>
                <BarChart width={isSmallScreen ? 410 : 600} height={250} data={processedData}>
                    <CartesianGrid stroke="transparent" />
                    <XAxis
                        axisLine={{ stroke: '#EDEDED' }}
                        tick={{ fill: '#EDEDED' }}
                        dataKey="date"
                        type="category"
                        interval={0}
                        tickFormatter={(tick) => tick.substring(0, 10)}
                    />
                    <YAxis axisLine={{ stroke: '#EDEDED' }} tick={{ fill: '#EDEDED' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="amount" fill="#fff" />
                </BarChart>
            </div>
        </div>
    );
};

export default ChartComponent;
