// client/src/App.tsx
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import CompleteProfile from './pages/CompleteProfile'
import AnnouncementBar from './components/AnnouncementBar'

function App() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <AnnouncementBar />
      {/* Header */}
      <Header />

      {/* Rutas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        {/* Más rutas: <Route path="/faqs" element={<Faqs />} />, etc. */}
      </Routes>
    </div>
  )
}

export default App
