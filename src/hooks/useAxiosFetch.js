import { useState, useEffect } from 'react'
import axios from 'axios'

const useAxiosFetch = (dataUrl) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [fetchError, setFetchError] = useState(null);

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
                    setFetchError(null)
                }
            } catch (err) {
                if (isMounted) {
                    setFetchError(err.message)
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
    return { data, fetchError, isLoading }
}

export default useAxiosFetch;