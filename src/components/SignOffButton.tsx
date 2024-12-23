import React from 'react';
import { Link } from 'react-router-dom';

const SignOffButton: React.FC = () => {
  const handleSignOff = () => {
    console.log('Signing off');
    sessionStorage.removeItem('username');
  };
  return (
    <div className="hidden md:flex justify-end mr-20">
      <Link
          to="/"
          className="bg-native-red rounded-full text-black font-medium font-['Poppins'] px-space-4 py-space-2 shadow-lg hover:bg-orange-600 transition"
          onClick={handleSignOff}
      >
          Sign Off
      </Link>
    </div>
  );
};

export default SignOffButton;
