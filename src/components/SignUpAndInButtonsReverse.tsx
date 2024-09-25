import React from 'react';
import { Link } from 'react-router-dom';

const SignUpAndInButtonsReverse: React.FC = () => {
    return (
            <div className="flex flex-row items-center justify-center pt-space-5 gap-[60px]">
            <Link
            to="/login"
            className="bg-native-red rounded-full text-black font-medium font-['Poppins'] px-space-4 py-space-2 shadow-lg hover:bg-orange-600 transition"
            >
            Log In
            </Link>
            <Link
            to="/signup"
            className="bg-transparent border-black border-[1px] rounded-full text-black font-medium font-['Poppins'] px-space-4 py-space-2 shadow-lg hover:bg-bg-green/50 transition"
            >
            Sign Up
            </Link>
        </div>
    );
};

export default SignUpAndInButtonsReverse;