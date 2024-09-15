import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

const CarouselsImage: React.FC = () => {
    const [index, setIndex] = useState<number>(0);

    // Explicitly type the selectedIndex parameter as number
    const handleSelect = (selectedIndex: number) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <img
                    className="w-[550px] h-[500px]" 
                    src='./assets/carousel3.png'
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="w-[550px] h-[500px] " 
                    src='./assets/carousel2.png'
                    alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="w-[550px] h-[500px]" 
                    src='./assets/carousel1.png'
                    alt="Third slide"
                />
            </Carousel.Item>
        </Carousel>
    );
};

export default CarouselsImage;
