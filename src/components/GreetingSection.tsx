import React from 'react';

interface GreetingSectionProps {
    title: string;
    message: string;
    }

    const GreetingSection: React.FC<GreetingSectionProps> = ({ title, message }) => {
    return (
        <div className="flex flex-col items-center justify-center bg-light-green rounded min-h-[800px] p-4 md:p-10 md:flex-1">
        <div className="pb-space-10 flex justify-center">
            <img
            src="./assets/person-icon.png"
            alt="person-icon"
            className="w-[155px] h-[155px]"
            />
        </div>
        <div className="flex flex-col items-center">
            <p className="font-prosto text-xxl font-bold text-center">
            {title}
            </p>
            <div className="flex justify-center pt-space-10">
            <p className="text-center font-poppins font-[200] text-l max-w-[350px]">
                {message}
            </p>
            </div>
        </div>
        </div>
    );
};

export default GreetingSection;