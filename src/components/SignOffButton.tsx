import React from 'react';
import { Link } from 'react-router-dom';

const SignOffButton: React.FC = () => {
    return (
        <div className="hidden md:flex space-x-4">
            <Link
                to="/homepage"
                className="bg-native-red rounded-full text-black font-light px-space-4 py-space-2 shadow-lg hover:bg-orange-600 transition"
            >
                Sign Off
            </Link>
        </div>
    );
};

export default SignOffButton;
