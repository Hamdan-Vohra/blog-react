
//importing all components
import { Header, Nav, Footer, Home, About, PostPage, NewPost, Missing } from './Exporter'
import { Route, Routes, BrowserRouter as Router, Switch, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/post" element={<PostPage />} />
        <Route path='/post/:id' element={<NewPost />} />
        <Route path="/about" element={<About />} />
        <Route path='*' element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
