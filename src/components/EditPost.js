import React, { Fragment, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const EditPost = ({
    posts, handleEdit, editTitle, setEditTitle, editBody, setEditBody
}) => {
    const { id } = useParams();
    const post = posts.find(post => post.id.toString() === id);

    useEffect(() => {
        console.log('in use effect')
        setEditTitle(post.title)
        setEditBody(post.body)
    }, [post, setEditBody, setEditTitle])
    return (
        <main className='NewPost'>
            {
                editTitle &&
                <Fragment>
                    <h2>Edit Post</h2>
                    <form className='newPostForm' onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor='postTitle'></label>
                        <input
                            id='postTitle'
                            type='text'
                            required
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        ></input>
                        <label htmlFor='postBody'></label>
                        <textarea
                            id='postBody'
                            required
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                        ></textarea>
                        <button
                            type='submit'
                            onClick={() => handleEdit(post.id)}
                        >Submit</button>
                    </form>
                </Fragment>
            }
            {
                !editTitle &&
                <Fragment>
                    <h2>Page Not Found</h2>
                    <p>
                        <Link to='/'>Visit Our HomePage</Link>
                    </p>
                </Fragment>
            }
        </main>
    )
}

export default EditPost