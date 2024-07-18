import { useState, useEffect } from 'react'
import axios from 'axios'

const useAxiosFetch = (dataUrl) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [fetchErr, setFetchErr] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const source = axios.CancelToken.source();

        const fetchData = async (url) => {
            setIsLoading(true)
            try {
                const response = await axios.get(url, {
                    CancelToken: source.token
                })
                if (isMounted) {
                    setData(response.data)
                    setFetchErr(null)
                }
            } catch (err) {
                if (isMounted) {
                    console.log(`Error:${err.message}`)
                    setFetchErr(err.message)
                    setData([])
                }
            } finally {
                isMounted && setIsLoading(false)
            }
        }

        fetchData(dataUrl);

        //returning cleanUp fn
        return () => {
            isMounted = false
            source.cancel();
        }
    }, [dataUrl])
    return { data, fetchErr, isLoading }
}

export default useAxiosFetch;