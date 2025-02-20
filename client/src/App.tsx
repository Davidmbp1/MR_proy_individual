// client/src/App.tsx

import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import CompleteProfile from './pages/CompleteProfile'
import AnnouncementBar from './components/AnnouncementBar'
import Restaurants from './pages/Restaurants' // Importa la nueva página

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
        <Route path="/restaurants" element={<Restaurants />} />
        {/* Puedes agregar más rutas, por ejemplo: FAQs, Story, Restaurateurs, etc. */}
      </Routes>
    </div>
  )
}

export default App
