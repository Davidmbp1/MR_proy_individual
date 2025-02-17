// client/src/components/Header.tsx
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="bg-white border-b border-gray-300 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          LastMinuteFoods
        </Link>
        <div className="space-x-4">
          <Link to="/login" className="text-gray-700 hover:text-blue-600">
            Login
          </Link>
          <Link 
            to="/register" 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Register
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
