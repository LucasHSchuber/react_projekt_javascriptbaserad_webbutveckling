import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';

const ChartComponent = () => {
    // Static data for demonstration purposes
    const staticData = [
        { date: '2023-01-01', Date: 5 },
        { date: '2023-01-02', Date: 8 },
        { date: '2023-01-03', Date: 12 },
        // Add more data as needed
    ];

    return (
        <BarChart width={500} height={250} data={staticData}>
            <CartesianGrid stroke="transparent" />
            <XAxis axisLine={{ stroke: '#EDEDED' }} tick={{ fill: '#EDEDED' }} dataKey="date" />
            <YAxis axisLine={{ stroke: '#EDEDED' }} tick={{ fill: '#EDEDED' }}  />
            <Tooltip />
            <Legend />
            <Bar
                dataKey="Date"
                fill="#fff"
                // barSize={100}
            />
        </BarChart>
    );
};

export default ChartComponent;
