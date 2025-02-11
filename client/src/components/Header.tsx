import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <header className="top-0 h-16 w-full flex items-center justify-between bg-none max-w-7xl mx-auto text-white">
      <Link to="/" className="text-2xl font-bold">
        Logo
      </Link>
      <div className='flex gap-x-8'>
        <Link to="/login" className="text-2xl font-bold">
          Login
        </Link>
        <Link to="/register" className="text-2xl font-bold">
          Register
        </Link>
      </div>
    </header>
  )
} 