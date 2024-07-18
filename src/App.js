
//importing all components
import { Header, Nav, Footer, Home, About, PostPage, NewPost, EditPost, Missing } from './Exporter'
import { Route, Routes } from 'react-router-dom'
import { DataProvider } from './context/DataContext'


function App() {

  return (
    <div className="App">
      <Header title={'ReactJs Blog'} />
      <DataProvider>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/post" element={<NewPost />} />
          <Route path='/post/:id' element={<PostPage />} />
          <Route path='/edit/:id' element={<EditPost />} />
          <Route path="/about" element={<About />} />
          <Route path='*' element={<Missing />} />
        </Routes>
      </DataProvider>
      <Footer />
    </div>
  );
}

export default App;
