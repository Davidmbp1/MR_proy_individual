import { useEffect } from 'react'
import axios from 'axios'

function GoogleLoginButton() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''
  const backendUrl = import.meta.env.VITE_BACKEND_URL || ''

  const handleCredentialResponse = async (response: any) => {
    const token = response.credential
    try {
      const res = await axios.post(`${backendUrl}/api/auth/google`, { token })
      console.log('Google login response', res.data)
      localStorage.setItem('token', res.data.token)
      alert(res.data.message)
    } catch (error) {
      console.error('Error en login con Google:', error)
    }
  }

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
      })
      window.google.accounts.id.renderButton(
        document.getElementById('googleButtonDiv'),
        { theme: 'outline', size: 'large' }
      )
    }
  }, [clientId, backendUrl])

  return (
    <div className="flex flex-col items-center">
      <div id="googleButtonDiv" />
    </div>
  )
}

export default GoogleLoginButton
