// client/src/components/OneTapGoogle.tsx

import { useEffect } from 'react'
import axios from 'axios'

declare global {
  interface Window {
    google?: any
  }
}

interface Props {
  redirectUrl?: string
}

function OneTapGoogle({ redirectUrl }: Props) {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''

  const handleCredentialResponse = async (response: any) => {
    const token = response.credential
    try {
      // OJO: Usar VITE_BACKEND_URL
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`,
        { token }
      )
      // Guardar token
      localStorage.setItem('token', res.data.token)
      alert(res.data.message)

      // Redirigir
      if (redirectUrl) {
        window.location.href = redirectUrl
      }
    } catch (error) {
      console.error('Error en Google login:', error)
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
      // Modo One Tap
      window.google.accounts.id.prompt()
      // Renderizar botón
      window.google.accounts.id.renderButton(
        document.getElementById('googleButtonDiv'),
        { theme: "outline", size: "large" }
      )
    }
  }, [clientId])

  return (
    <div className="flex flex-col items-center mt-4">
      <div id="googleButtonDiv" />
    </div>
  )
}

export default OneTapGoogle
