import { useEffect } from 'react';

const useKeyHandler = (key: string, callback: () => void, condition = true) => {
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === key && condition) {
                callback();
            }
        };

        // Add event listener when the component mounts
        window.addEventListener('keydown', handleKeyPress);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [key, callback, condition]);
};

export default useKeyHandler;