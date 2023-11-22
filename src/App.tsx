import { Header } from './components/header';
import { MainPages } from './pages/main';
import './style/App.css'
import { BrowserRouter } from 'react-router-dom';

function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <MainPages/>
      </BrowserRouter>
    </div>
  )
}

export default App
