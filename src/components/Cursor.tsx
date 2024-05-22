// Cursor.tsx
import React, { useEffect } from 'react';

const Cursor: React.FC = () => {
    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            const cursor = document.querySelector('.cursor');
            if (cursor instanceof HTMLElement) {
                cursor.style.transform = `translate(${e.pageX - 1}px, ${e.pageY - 1}px)`;
            }
        };

        document.addEventListener('mousemove', updateMousePosition);

        return () => {
            document.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

    return <div className="cursor"></div>;
};

export default Cursor;
