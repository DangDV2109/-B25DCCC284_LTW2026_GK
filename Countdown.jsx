import { useState, useEffect } from 'react';

const Countdown = ({ date }) => {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const targetDate = new Date(`${date}T00:00:00`);

        const calculateTime = () => {
            const now = new Date();
            const difference = targetDate - now;

            if (difference <= 0) {
                setTimeLeft('Sự kiện đã diễn ra');
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            setTimeLeft(`Còn ${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`);
        };

        calculateTime();
        const interval = setInterval(calculateTime, 1000);

        return () => clearInterval(interval);
    }, [date]);

    return <div>{timeLeft}</div>;
};

export default Countdown;