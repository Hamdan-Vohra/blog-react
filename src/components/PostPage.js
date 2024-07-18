import { Fragment } from 'react';
import { useParams, Link } from 'react-router-dom'
import { useContext } from '../HooksExporter'
import DataContext from '../context/DataContext'

const PostPage = () => {
    const { posts, setPosts, api, navigate } = useContext(DataContext);
    const { id } = useParams();
    const post = posts.find(post => (post.id).toString() === id)

    const handleDelete = async (id) => {
        try {
            await api.delete(`/posts/${id}`);
            const updatedPosts = posts.filter((post) => post.id !== id)
            setPosts(updatedPosts)
            navigate('/')
        } catch (err) {
            console.log(`Error: ${err.message}`)
        }
    }
    return (
        <main className='PostPage'>
            <article className='post'>
                {post ?
                    (<Fragment>
                        <h2>
                            {post.title}
                        </h2>
                        <p className='postDate'>{post.datetime}</p>
                        <p className='postBody'>{post.body}</p>
                        <Link to={`/edit/${post.id}`}>
                            <button
                                className='editButton'>Edit Post
                            </button>
                        </Link>
                        <button
                            className='deleteButton'
                            onClick={() => handleDelete(post.id)}
                        > Delete Post</button>


                    </Fragment>)
                    : (
                        <Fragment>
                            <h2>Post Not Found</h2>
                            <p>
                                <Link to='/'>Visit Our HomePage</Link>
                            </p>
                        </Fragment>
                    )
                }
            </article>
        </main >
    )
}

export default PostPage