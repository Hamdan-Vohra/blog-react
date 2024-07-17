
//importing all components
import { Header, Nav, Footer, Home, About, PostPage, NewPost, EditPost, Missing } from './Exporter'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        //using axios api http fns 
        const response = await api.get('/posts');
        setPosts(response.data)
      } catch (err) {
        //if error is related to response
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.header);
        } else {
          console.log(`Error:${err.message}`)
        }
      }
    }

    fetchPosts();
  }, [])

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
      console.log('Delete')
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
      <Header title={'ReactJs Blog'} />
      <Nav
        search={search}
        setSearch={setSearch} />
      <Routes>
        <Route path='/' element={<Home posts={searchResults} />} />
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
