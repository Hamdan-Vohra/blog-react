import React from 'react'
import FeedData from './FeedData'

const Home = ({ posts }) => {
    return (
        <main className='Home'>
            {posts.length ? (
                <FeedData posts={posts} />
            ) : (
                <p style={{ marginTop: '2rem' }}>
                    No Posts To display
                </p>
            )}
        </main>
    )
}

export default Home