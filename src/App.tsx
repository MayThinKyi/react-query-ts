import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Posts from './pages/Posts'
import Post from './pages/Post'
import PostEdit from './pages/Post-Edit'

const App = () => {
  return (
    <>
    <h1>Awesome Posts Blog</h1>
      <Router>
        <Routes>
          <Route path='/' element={<Posts/>} />
          <Route path='/:postId' element={<Post/>} />
          <Route path='/:postId/edit' element={<PostEdit/>} />

        </Routes>
      </Router>
    </>
  )
}

export default App
