// client/src/pages/Login.tsx
import React, { useState } from 'react'
import axios from 'axios'

function Login() {
  const [form, setForm] = useState({ email: '', password: '' })

  // Opcional: almacenar un posible mensaje de éxito o de error
  const [message, setMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('') // Limpiamos cualquier mensaje previo

    try {
      // Llamada a tu endpoint de login
      const response = await axios.post('http://localhost:4000/api/auth/login', form)

      // Si la respuesta es exitosa, guardamos el token (por ejemplo en localStorage)
      const { token } = response.data
      localStorage.setItem('token', token)

      setMessage('¡Login exitoso!')
      console.log('Token recibido:', token)
    } catch (error: any) {
      // Obtenemos el mensaje de error del servidor, si existe
      const msg = error.response?.data?.message || 'Error en el login'
      setMessage(msg)
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Login</h2>
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
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  )
}

export default Login
