
import { Route, Routes } from 'react-router-dom';
import { Home } from './home';
import { Login } from './login';

import '../style/main.css'
import { CreatePost } from './create-post';

export function MainPages() {
  return(
    <main>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/create' element={<CreatePost />} />
      </Routes>
    </main>
  )
}