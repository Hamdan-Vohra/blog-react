import { useContext, useState } from '../HooksExporter'
import DataContext from '../context/DataContext'

const NewPost = () => {
    const { posts, setPosts, format, api, navigate } = useContext(DataContext)
    const [postTitle, setPostTitle] = useState('')
    const [postBody, setPostBody] = useState('')
    const handleSubmit = async (event) => {
        event.preventDefault();
        const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
        const datetime = format(new Date(), "MMMM dd ,yyyy pp");
        const newPost = {
            id,
            title: postTitle,
            datetime,
            body: postBody
        }

        //handling api request
        try {

            const response = await api.post('/posts', newPost);
            const updatedPosts = [...posts, response.data]
            setPosts(updatedPosts);
            setPostBody('');
            setPostTitle('');
            navigate('/');
        } catch (err) {
            console.log(`Error: ${err.message}`)
        }
    }
    return (
        <main className='NewPost'>
            <h2>New Post</h2>
            <form className='newPostForm' onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor='postTitle'></label>
                <input
                    id='postTitle'
                    type='text'
                    required
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                ></input>
                <label htmlFor='postBody'></label>
                <textarea
                    id='postBody'
                    required
                    value={postBody}
                    onChange={(e) => setPostBody(e.target.value)}
                ></textarea>
                <button type='submit'>Submit</button>
            </form>
        </main>
    )
}

export default NewPost