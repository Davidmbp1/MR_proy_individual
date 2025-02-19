import  { useEffect } from 'react'
import axios from 'axios'

function GoogleLoginButton() {
  // Reemplaza con tu variable de entorno (o ponlo directamente)
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''

  // Callback cuando Google devuelva un `credential`
  const handleCredentialResponse = async (response: any) => {
    const token = response.credential // ID token de Google
    try {
      // Llamar a tu backend
      const res = await axios.post('http://localhost:4000/api/auth/google', { token })
      console.log('Google login response', res.data)
      // Guardar el JWT de tu backend en localStorage
      localStorage.setItem('token', res.data.token)
      alert(res.data.message)
    } catch (error) {
      console.error('Error en login con Google:', error)
    }
  }

  useEffect(() => {
    // Verificamos que exista la librería de google
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
      })
      // Renderizamos el botón en un div con id "googleButtonDiv"
      window.google.accounts.id.renderButton(
        document.getElementById('googleButtonDiv'),
        { theme: 'outline', size: 'large' }
      )
    }
  }, [clientId])

  return (
    <div className="flex flex-col items-center">
      {/* Aquí se inyecta el botón */}
      <div id="googleButtonDiv" />
    </div>
  )
}

export default GoogleLoginButton