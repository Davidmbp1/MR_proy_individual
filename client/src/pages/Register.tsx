// client/src/pages/Register.tsx
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import OneTapGoogle from '../components/OneTapGoogle'

function Register() {
  const [form, setForm] = useState({ email: '', password: '', name: '' })
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,
        form
      )
      setMessage(res.data.message)
      // Guardar token
      localStorage.setItem('token', res.data.token)
      // Redirigir a /complete-profile
      navigate('/complete-profile')
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Error en registro')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <h2 className="text-3xl font-bold mb-6">Registro</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
        <input 
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2"
        />
        <input 
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2"
        />
        <input 
          type="text"
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2"
        />
        <button 
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Registrarse
        </button>
      </form>

      {message && <p className="mt-4 text-red-600">{message}</p>}

      <p className="mt-6">O regístrate con Google:</p>
      <OneTapGoogle redirectUrl="/complete-profile" />
    </div>
  )
}

export default Register
