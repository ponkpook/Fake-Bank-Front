import React from 'react';
import { Link } from 'react-router-dom';

const SignUpAndInButtons: React.FC = () => {
    return (
        <div className="hidden md:flex space-x-4">
        <Link
            to="/login"
            className="bg-transparent text-black rounded-full font-light px-space-4 py-space-2 shadow-lg hover:bg-native-milk/50 transition"
        >
            Log In
        </Link>
        <Link
            to="/signup"
            className="bg-native-red rounded-full text-black font-light px-space-4 py-space-2 shadow-lg hover:bg-orange-600 transition"
        >
            Sign Up
        </Link>
        </div>
    );
};

export default SignUpAndInButtons;
