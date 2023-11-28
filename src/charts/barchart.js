import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

class CustomBarChart extends React.Component {
    render() {
        // Extracting the data from the props
        const { data } = this.props;

        // Transform the data into the format expected by Recharts (combination of key + value pair)
        const chartData = [
            { name: '0 star', rating: data.zero },
            { name: '1 star', rating: data.one },
            { name: '2 stars', rating: data.two },
            { name: '3 stars', rating: data.three },
            { name: '4 stars', rating: data.four },
            { name: '5 stars', rating: data.five }
        ];

        // console.log(chartData)

        return (
            <ResponsiveContainer width="30%" height={300}>
                <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" label={{ value: 'Ratings by Reviewers', offset: -15, position:'insideBottom', dx: 100  }} />
                    <YAxis label={{ value: 'Percentage of Total Ratings (%)', angle: -90, position: 'insideLeft', offset: 0, dy: 120  }}/>
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="rating" fill="#8884d8" barSize={30} />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}

export default CustomBarChart;
