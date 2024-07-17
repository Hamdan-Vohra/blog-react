
//importing all components
import { Header, Nav, Footer, Home, About, PostPage, NewPost, EditPost, Missing } from './Exporter'
import { useWindowSize, useAxiosFetch, useState, useEffect, useNavigate } from './HooksExporter'
import { Route, Routes } from 'react-router-dom'
import { format } from 'date-fns'
import api from './api/posts'

function App() {

  const [search, setSearch] = useState('')
  const [posts, setPosts] = useState([])
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  //custom hook
  const { width } = useWindowSize();
  const { data, fetchErr, isLoading } = useAxiosFetch('http://localhost:3500/posts')

  useEffect(() => { setPosts(data) }, [data]);

  useEffect(() => {
    const results = posts.filter((post) => (post.title.toLowerCase()).includes(search.toLowerCase()) || (post.body.toLowerCase()).includes(search.toLowerCase()));
    setSearchResults(results);
  }, [posts, search])

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const editPost = { id, title: editTitle, datetime, body: editBody }
    try {
      const response = await api.put(`/posts/${id}`, editPost);
      const editedPosts = posts.map(post => post.id === id ? response.data : post);
      setPosts(editedPosts)
      setEditTitle('')
      setEditBody('')
      navigate('/')
    } catch (err) {
      console.log(`Error:${err.message}`)
    }
  }

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
    <div className="App">
      <Header title={'ReactJs Blog'} width={width} />
      <Nav
        search={search}
        setSearch={setSearch} />
      <Routes>
        <Route path='/' element={<Home posts={searchResults} fetchErr={fetchErr} isLoading={isLoading} />} />
        <Route path="/post" element={<NewPost handleSubmit={handleSubmit} postTitle={postTitle} setPostTitle={setPostTitle} postBody={postBody} setPostBody={setPostBody} />} />
        <Route path='/post/:id' element={<PostPage posts={posts} handleDelete={handleDelete} />} />
        <Route path='/edit/:id' element={<EditPost posts={posts} handleEdit={handleEdit} editTitle={editTitle} setEditTitle={setEditTitle} editBody={editBody} setEditBody={setEditBody} />} />
        <Route path="/about" element={<About />} />
        <Route path='*' element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
