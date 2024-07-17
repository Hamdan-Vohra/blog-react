import React from 'react'
import FeedData from './FeedData'

const Home = ({ posts, fetchErr, isLoading }) => {
    return (
        <main className='Home'>
            {!isLoading && fetchErr && <p className='statusMsg' style={{ color: 'red' }}>{fetchErr}</p>}
            {isLoading && <p className='statusMsg'>Loading Posts..</p>}
            {
                !isLoading && !fetchErr && ((posts.length) ? (
                    <FeedData posts={posts} />
                ) : (
                    <p className='statusMsg'>No Posts to display.</p>
                ))
            }
        </main>
    )
}

export default Home