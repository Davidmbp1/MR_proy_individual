import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { Header } from './components/Header'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    </>
  )
}

export default App
