import { useAxiosFetch, useState, useEffect, createContext, useNavigate } from '../HooksExporter'
import { format } from 'date-fns'
import api from '../api/posts'

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [search, setSearch] = useState('')
    const [posts, setPosts] = useState([])
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();
    //custom hook
    const { data, fetchErr, isLoading } = useAxiosFetch('http://localhost:3500/posts')

    useEffect(() => { setPosts(data) }, [data]);

    useEffect(() => {
        const results = posts.filter((post) => (post.title.toLowerCase()).includes(search.toLowerCase()) || (post.body.toLowerCase()).includes(search.toLowerCase()));
        setSearchResults(results);
    }, [posts, search])
    return (
        <DataContext.Provider value={{
            posts, setPosts,
            search, setSearch,
            searchResults,
            format, api, navigate,
            fetchErr, isLoading,
        }} >
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;