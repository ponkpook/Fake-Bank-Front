'use client';
import React from 'react';
import CountUp from 'react-countup';

// Define the type for the accounts prop
    interface AnimatedCounterProps {
    accounts: { balance: string }[];
    }

    const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ accounts }) => {
    // Calculate total balance
    const totalBalance = accounts.reduce((total, account) => {
        const balance = parseFloat(account.balance.replace("$", ""));
        return total + balance;
    }, 0);

    return (
        <div className='w-full'>
        <CountUp 
            decimal=','
            decimals={2}
            prefix='AUD: $'
            end={totalBalance} // Use total balance
        />
        </div>
    );
};

export default AnimatedCounter;
