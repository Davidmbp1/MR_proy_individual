// client/src/components/Header.tsx

import { Link } from 'react-router-dom'

function Header() {
  // Podrías consultar si hay un token, etc., para mostrar el avatar
  const token = localStorage.getItem('token')
  // Opcional: Incluir datos del user si los guardas en un store

  return (
    <header className="bg-gray-100 border-b border-gray-300 shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          LastMinuteFoods
        </Link>

        <div className="space-x-4">
          {token ? (
            // Si hay token, muestra un perfil o logout
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              Mi Perfil (o Logout, etc.)
            </Link>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600">
                Login
              </Link>
              <Link 
                to="/register" 
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header