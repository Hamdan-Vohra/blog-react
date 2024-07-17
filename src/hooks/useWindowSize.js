import { useState, useEffect } from 'react'

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined
    })

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }

        handleResize();

        //now we want to invoke this function when window size changes
        window.addEventListener('resize', handleResize);

        //just to avoid memory leak we have to add functionality of cleanup in useEffect
        const cleanUp = () => {
            window.removeEventListener('resize', handleResize)
        }

        return cleanUp;
    }, [])

    //this will be returned from Hook
    return windowSize;
}

export default useWindowSize