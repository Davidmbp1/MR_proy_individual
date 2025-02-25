// client/src/components/Header.tsx

import { NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import { useState } from 'react';

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <header className="bg-white text-gray-900 border-b border-gray-200 shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Fila principal */}
        <div className="flex items-center justify-between py-3">
          {/* LOGO */}
          <div className="flex items-center gap-2">
            <NavLink
              to="/"
              className="text-2xl font-bold text-blue-800 hover:text-blue-900 transition-colors"
            >
              LastMinute<span className="font-black">Foods</span>
            </NavLink>
          </div>

          {/* BOTÓN MENÚ MÓVIL */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* BARRA DE BÚSQUEDA + MENÚ DESKTOP */}
          <div className="hidden md:flex md:items-center md:gap-6 flex-1 ml-4">
            {/* BÚSQUEDA */}
            <div className="flex-1 max-w-md mx-auto">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search restaurants"
                  className="w-full bg-gray-100 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
            </div>

            {/* MENÚ DESKTOP */}
            <nav className="flex items-center gap-6 ml-auto">
              <NavLink
                to="/faqs"
                className={({ isActive }) =>
                  'font-medium transition-colors hover:text-blue-600' +
                  (isActive ? ' text-blue-600' : '')
                }
              >
                FAQs
              </NavLink>
              <NavLink
                to="/story"
                className={({ isActive }) =>
                  'font-medium transition-colors hover:text-blue-600' +
                  (isActive ? ' text-blue-600' : '')
                }
              >
                Our Story
              </NavLink>

              {token ? (
                <>
                  <button
                    onClick={() => navigate('/profile')}
                    className="font-medium transition-colors hover:text-blue-600"
                  >
                    Mi Perfil
                  </button>
                  <button
                    onClick={handleLogout}
                    className="font-medium transition-colors hover:text-blue-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      'font-medium transition-colors hover:text-blue-600' +
                      (isActive ? ' text-blue-600' : '')
                    }
                  >
                    Sign Up
                  </NavLink>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      'font-medium transition-colors hover:text-blue-600' +
                      (isActive ? ' text-blue-600' : '')
                    }
                  >
                    Login
                  </NavLink>
                </>
              )}

              {/* Cambiamos el texto a algo corto, p. ej: "Sell with LMF" */}
              <NavLink
                to="/restaurateurs"
                className={({ isActive }) =>
                  'border border-gray-400 px-3 py-1 rounded hover:bg-gray-200 transition-colors font-medium' +
                  (isActive ? ' text-blue-600' : '')
                }
              >
                Sell with LMF
              </NavLink>
            </nav>
          </div>
        </div>
      </div>

      {/* MENÚ MÓVIL */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200 shadow-sm">
          {/* BÚSQUEDA móvil */}
          <div className="flex items-center bg-gray-100 rounded-full px-3 py-2 mx-4 mt-3 mb-2">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search restaurants"
              className="bg-transparent focus:outline-none flex-1 text-sm text-gray-700"
            />
          </div>

          {/* Opciones de menú en columna */}
          <ul className="flex flex-col p-4 gap-3">
            <li>
              <NavLink
                to="/faqs"
                className={({ isActive }) =>
                  'font-medium transition-colors hover:text-blue-600' +
                  (isActive ? ' text-blue-600' : '')
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQs
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/story"
                className={({ isActive }) =>
                  'font-medium transition-colors hover:text-blue-600' +
                  (isActive ? ' text-blue-600' : '')
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                Our Story
              </NavLink>
            </li>
            {token ? (
              <>
                <li>
                  <button
                    onClick={() => {
                      navigate('/profile');
                      setMobileMenuOpen(false);
                    }}
                    className="font-medium transition-colors hover:text-blue-600"
                  >
                    Mi Perfil
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="font-medium transition-colors hover:text-blue-600"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      'font-medium transition-colors hover:text-blue-600' +
                      (isActive ? ' text-blue-600' : '')
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      'font-medium transition-colors hover:text-blue-600' +
                      (isActive ? ' text-blue-600' : '')
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </NavLink>
                </li>
              </>
            )}
            <li>
              <NavLink
                to="/restaurateurs"
                className={({ isActive }) =>
                  'border border-gray-400 px-4 py-2 rounded hover:bg-gray-200 transition-colors inline-block font-medium' +
                  (isActive ? ' text-blue-600' : '')
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                Sell with LMF
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;
