import { useState, useEffect } from 'react'

export function useMagicWriter(text, speed) {
    const [typedText, setTypedText] = useState('');
    const [index, setIndex] = useState(0);
    const [showCursor, setShowCursor] = useState(true);
  
    useEffect(() => {
        if (index < text.length) {
            const timeoutId = setTimeout(() => {
                setTypedText((prev) => prev + text.charAt(index));
                setIndex((prevIndex) => prevIndex + 1);
            }, speed);
            return () => clearTimeout(timeoutId);
        }
    }, [index, text, speed]);

    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor((prevShowCursor) => !prevShowCursor);
        }, 300);
        return () => clearInterval(cursorInterval);
    }, [300]);
  
    const displayTextWithCursor = (
        <>
            {typedText}<span style={{ opacity: showCursor ? 1 : 0 }}>|</span>
        </>
    );
    
    return displayTextWithCursor;
}