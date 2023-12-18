import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const ChartComponent = () => {
    const [accountingsData, setAccountingsData] = useState([]);

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
        const date = entry.created_at.substring(0, 10); // Extract first 10 characters for date

        // If entry with this date already exists, add the amount; otherwise, create a new entry
        if (result[date]) {
            result[date].amount += 1; // Adjust this line based on the actual structure of your data
        } else {
            result[date] = {
                date,
                amount: 1, // Adjust this line based on the actual structure of your data
            };
        }

        return result;
    }, {});

    const processedData = Object.values(groupedData);




    return (
        <BarChart width={500} height={250} data={processedData}>
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
    );
};

export default ChartComponent;
