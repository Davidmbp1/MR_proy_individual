// client/src/components/Header.tsx

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaBars, FaTimes, FaSearch } from 'react-icons/fa'

function Header() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  
  // Estado para menú móvil
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        
        {/* LOGO a la izquierda */}
        <div className="flex items-center gap-2">
          <Link to="/" className="text-xl sm:text-2xl font-bold text-blue-800">
            LastMinute<span className="font-black">Foods</span>
          </Link>
        </div>

        {/* BÚSQUEDA - visible en pantallas md+ */}
        <div className="hidden lg:flex items-center bg-gray-100 rounded-full px-3 py-2 w-[400px] ml-6">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search restaurants"
            className="bg-transparent focus:outline-none flex-1 text-sm text-gray-700"
          />
        </div>

        {/* MENÚ DESKTOP */}
        <nav className="hidden md:flex items-center gap-6 ml-auto">
          <Link to="/faqs" className="text-gray-700 hover:text-blue-600 transition">
            FAQs
          </Link>
          <Link to="/story" className="text-gray-700 hover:text-blue-600 transition">
            Our Story
          </Link>
          
          {token ? (
            <>
              <button 
                onClick={() => navigate('/complete-profile')}
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Mi Perfil
              </button>
              <button 
                onClick={handleLogout}
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/register" 
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Sign Up
              </Link>
              <Link 
                to="/login" 
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Login
              </Link>
            </>
          )}

          <Link
            to="/restaurateurs"
            className="border border-gray-400 px-3 py-1 rounded hover:bg-gray-200 transition"
          >
            For Restaurateurs
          </Link>
        </nav>

        {/* BOTÓN MENÚ MÓVIL */}
        <div className="md:hidden ml-auto">
          <button
            className="text-gray-600 hover:text-blue-600 transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* BÚSQUEDA MÓVIL - si quieres */}
      {!mobileMenuOpen && (
        <div className="flex lg:hidden items-center bg-gray-100 rounded-full px-3 py-2 mx-4 mb-2">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search restaurants"
            className="bg-transparent focus:outline-none flex-1 text-sm text-gray-700"
          />
        </div>
      )}

      {/* MENÚ MÓVIL */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200 shadow-sm">
          <ul className="flex flex-col p-4 gap-3">
            <li>
              <Link 
                to="/faqs"
                className="text-gray-700 hover:text-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQs
              </Link>
            </li>
            <li>
              <Link 
                to="/story"
                className="text-gray-700 hover:text-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Our Story
              </Link>
            </li>

            {token ? (
              <>
                <li>
                  <button
                    onClick={() => {
                      navigate('/complete-profile')
                      setMobileMenuOpen(false)
                    }}
                    className="text-gray-700 hover:text-blue-600"
                  >
                    Mi Perfil
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout()
                      setMobileMenuOpen(false)
                    }}
                    className="text-gray-700 hover:text-blue-600"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link 
                    to="/register"
                    className="text-gray-700 hover:text-blue-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/login"
                    className="text-gray-700 hover:text-blue-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link
                to="/restaurateurs"
                className="border border-gray-400 px-3 py-1 rounded hover:bg-gray-200 transition inline-block"
                onClick={() => setMobileMenuOpen(false)}
              >
                For Restaurateurs
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}

export default Header
