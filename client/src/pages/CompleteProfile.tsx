// client/src/pages/CompleteProfile.tsx

import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CompleteProfile() {
  const [promo, setPromo] = useState('')
  const [agreeTos, setAgreeTos] = useState(false)
  const [contactPermission, setContactPermission] = useState<'yes' | 'no'>('yes')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    if (!token) {
      setMessage('No estás autenticado. Por favor inicia sesión.')
      return
    }

    try {
      setMessage('')
      // Llamar a tu backend /api/users/profile
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/profile`,
        {
          promoCode: promo,
          agreeTerms: agreeTos,
          contactPermission
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setMessage(res.data.message || 'Datos actualizados')
      // Podrías redirigir a home
      navigate('/')
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Error al actualizar perfil')
    }
  }

  return (
    <div className="flex flex-col md:flex-row">
      {/* Lado Izquierdo: formulario */}
      <div className="w-full md:w-1/2 p-8">
        <button
          onClick={() => navigate('/')}
          className="text-sm text-blue-600 underline mb-4"
        >
          &larr; Back to home
        </button>
        <h2 className="text-3xl font-bold mb-6">Sign In</h2>

        {/* Botón de Google (opcional) */}
        <button
          className="bg-white border border-gray-400 px-4 py-2 rounded hover:bg-gray-200 mb-6"
        >
          Google
        </button>

        <p className="font-bold mb-2">Welcome back! Just a few more questions:</p>
        {/* Promo code */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Promo code (optional)
          </label>
          <input
            type="text"
            value={promo}
            onChange={(e) => setPromo(e.target.value)}
            placeholder="Have a promo code? Enter it here"
            className="mt-1 border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>

        {/* Terms */}
        <h3 className="text-xl font-bold mt-6">Terms and privacy</h3>
        <p className="text-sm mb-2">
          We want you to know exactly how our service works ...
        </p>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={agreeTos}
            onChange={() => setAgreeTos(!agreeTos)}
            className="mr-2"
          />
          <label className="text-sm">
            I agree to the{' '}
            <a href="#" className="text-blue-700 underline">
              terms and conditions
            </a>
          </label>
        </div>

        {/* Contact permission */}
        <h3 className="text-xl font-bold mt-4">Contact permission</h3>
        <p className="text-sm mb-4">
          We’d love to email you free booking credit coupons ...
        </p>
        <div className="flex gap-2 items-center mb-4">
          <input
            type="radio"
            id="contactYes"
            checked={contactPermission === 'yes'}
            onChange={() => setContactPermission('yes')}
          />
          <label htmlFor="contactYes" className="text-sm">
            Yes, send me news and promotions
          </label>
        </div>
        <div className="flex gap-2 items-center mb-4">
          <input
            type="radio"
            id="contactNo"
            checked={contactPermission === 'no'}
            onChange={() => setContactPermission('no')}
          />
          <label htmlFor="contactNo" className="text-sm">
            No thanks (not recommended)
          </label>
        </div>

        {/* Botones */}
        <div className="flex gap-4 mt-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-200"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            Update Details
          </button>
        </div>

        {message && <p className="mt-4 text-red-600">{message}</p>}
      </div>

      {/* Lado derecho: Imagen, texto decorativo */}
      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1552566626-52f8b828add9")'
        }}
      >
        <div className="w-full h-full bg-black bg-opacity-40 flex items-center justify-center text-white p-8">
          <h2 className="text-3xl font-bold text-center">
            There’s never been a better time to tuck in
          </h2>
        </div>
      </div>
    </div>
  )
}

export default CompleteProfile
