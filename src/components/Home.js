import React from 'react'
import FeedData from './FeedData'
import { useContext } from '../HooksExporter'
import DataContext from '../context/DataContext'

const Home = () => {
    const { searchResults, fetchErr, isLoading } = useContext(DataContext)
    return (
        <main className='Home'>
            {fetchErr && <p className='statusMsg' style={{ color: 'red' }}>{fetchErr}</p>}
            {isLoading && !fetchErr && <p className='statusMsg'>Loading Posts..</p>}
            {
                !fetchErr && !isLoading && ((searchResults.length) ? (
                    <FeedData posts={searchResults} />
                ) : (
                    <p className='statusMsg'>No Posts to display.</p>
                ))
            }
        </main>
    )
}

export default Home