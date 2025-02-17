// client/src/pages/Register.tsx
import React, { useState } from 'react'
import axios from 'axios'
import OneTapGoogle from '../components/OneTapGoogle'

function Register() {
  const [form, setForm] = useState({ email: '', password: '', name: '' })
  const [message, setMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setMessage('')
      // Llamada a tu backend
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`, 
        form
      )
      setMessage(res.data.message)
      // Podrías redirigir a /complete-profile
      window.location.href = '/complete-profile'
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Error en registro')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <h2 className="text-3xl font-bold mb-6">Registro</h2>
      <form 
        onSubmit={handleSubmit} 
        className="flex flex-col gap-4 w-full max-w-sm"
      >
        <input
          type="text"
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
      {message && (
        <p className="mt-4 text-red-600">{message}</p>
      )}

      <p className="mt-6">O regístrate con Google:</p>
      {/* GSI (OneTap + botón) */}
      <OneTapGoogle redirectUrl="/complete-profile" />
    </div>
  )
}

export default Register
