import {BrowserRouter, Route, Routes} from 'react-router-dom'
import ForgotPage from './pages/ForgotPage'
import HomePage from './pages/HomePage'


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/forgot-password" element={<ForgotPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App