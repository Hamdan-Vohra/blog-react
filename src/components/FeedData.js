import React, { Fragment } from 'react'
import Post from './Post'

function FeedData({ posts }) {
    return (
        <Fragment>
            {posts.map(post =>
                <Post key={post.id} post={post} />
            )}
        </Fragment >
    )
}

export default FeedData