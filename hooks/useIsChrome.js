import { useState, useEffect } from "react";

export default function useIsChrome() {
    const [isChrome, setIsChrome] = useState(false);
  
    useEffect(() => {
        const userAgent = navigator.userAgent;
        const isChromeBrowser = /Chrome/.test(userAgent) && /Google Inc/.test(navigator.vendor);

        setIsChrome(isChromeBrowser);
    }, []);
  
    return isChrome;
}