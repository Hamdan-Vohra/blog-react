
//importing all components
import { Header, Nav, Footer, Home, About, PostPage, NewPost, Missing } from './Exporter'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { format } from 'date-fns'

function App() {
  const hardcoded = [
    {
      id: 1,
      title: "My First Blog",
      datetime: "July 01,1999 2:12:22 am",
      body: "This is the body for blog 1"
    },
    {
      id: 2,
      title: "My Second Blog",
      datetime: "June 01,1999 2:12:22 am",
      body: "This is the body for blog 2"
    },
    {
      id: 3,
      title: "My Third Blog",
      datetime: "July 02,1999 2:12:22 am",
      body: "This is the body for blog 3"
    }
  ]
  const [search, setSearch] = useState('')
  const [posts, setPosts] = useState(hardcoded)
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const results = posts.filter((post) => (post.title.toLowerCase()).includes(search.toLowerCase()) || (post.body.toLowerCase()).includes(search.toLowerCase()));
    setSearchResults(results);
  }, [posts, search])

  const handleDelete = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id)
    setPosts(updatedPosts)
    navigate('/')
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd ,yyyy pp");
    const newPost = {
      id,
      title: postTitle,
      datetime,
      body: postBody
    }
    const updatedPosts = [...posts, newPost]
    setPosts(updatedPosts);
    setPostBody('');
    setPostTitle('');
    navigate('/');
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
        <Route path="/about" element={<About />} />
        <Route path='*' element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
