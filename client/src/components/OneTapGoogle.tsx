// client/src/components/OneTapGoogle.tsx
import React, { useEffect } from 'react'
import axios from 'axios'

declare global {
  interface Window {
    google?: any
  }
}

interface Props {
  redirectUrl?: string; // a dónde redirigir tras login
}

function OneTapGoogle({ redirectUrl }: Props) {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''

  const handleCredentialResponse = async (response: any) => {
    const token = response.credential
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/google`, 
        { token }
      )
      // Guardar JWT
      localStorage.setItem('token', res.data.token)
      alert(res.data.message)
      // Redirigir
      if (redirectUrl) {
        window.location.href = redirectUrl
      }
    } catch (error) {
      console.error('Error en login con Google:', error)
    }
  }

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true
      })
      // One Tap
      window.google.accounts.id.prompt()
      // Botón
      window.google.accounts.id.renderButton(
        document.getElementById('googleButtonDiv'),
        { theme: "outline", size: "large" }
      )
    }
  }, [clientId])

  return (
    <div className="flex flex-col items-center mt-4">
      <div id="googleButtonDiv" className="mt-4" />
    </div>
  )
}

export default OneTapGoogle
