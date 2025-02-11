// client/src/pages/Register.tsx
import React, { useState } from 'react'
import axios from 'axios'

function Register() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: ''
  })

  // Mensaje de respuesta (éxito o error)
  const [message, setMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')

    try {
      // Llamada a tu endpoint de registro
      const response = await axios.post('http://localhost:4000/api/auth/register', form)
      
      // Si es exitoso, mostramos el mensaje del servidor
      setMessage(response.data.message)
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Error en el registro'
      setMessage(msg)
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Registro</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input 
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Nombre:</label>
          <input 
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Crear Cuenta</button>
      </form>
    </div>
  )
}

export default Register
