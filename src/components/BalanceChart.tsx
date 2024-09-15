// BalanceChart.tsx
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the chart components
ChartJS.register(ArcElement, Tooltip, Legend);

interface BalanceChartProps {
    accounts: {
        balance: number;
        name: string;
    }[];
    }

    const BalanceChart: React.FC<BalanceChartProps> = ({ accounts }) => {
    // Process the accounts data into chart data
    const data = {
        datasets: [
        {
            label: 'Banks',
            data: [100,1000,1000,1000,1000], // Use account balance for data
            backgroundColor: ['#A8E6CE', '#DCEDC2','#FFD3B5','#FFAAA6','#FF8C94'], // Adjust colors as needed
        }
        ],
        labels: accounts.map(account => account.name), // Use account names for labels
    };

    return (
        <div style={{ maxWidth: '400px' }}>
        <Doughnut data={data} />
        </div>
    );
};

export default BalanceChart;
