// client/src/components/OneTapGoogle.tsx
import { useEffect } from 'react';
import axios from 'axios';

declare global {
  interface Window {
    google?: any;
  }
}

interface Props {
  onSuccess?: (response: any) => void;
  onError?: (msg: string) => void;
}

function OneTapGoogle({ onSuccess, onError }: Props) {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

  const handleCredentialResponse = async (response: any) => {
    const token = response.credential;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`,
        { token }
      );
      const { token: internalToken } = res.data;
      localStorage.setItem('token', internalToken);
      if (onSuccess) onSuccess(response);
    } catch (error: any) {
      if (onError) {
        onError(error.response?.data?.message || 'Error in Google login');
      }
    }
  };

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
      });
      // Modo One Tap
      window.google.accounts.id.prompt();
      const googleButtonDiv = document.getElementById('googleButtonDiv');
      if (googleButtonDiv) {
        window.google.accounts.id.renderButton(googleButtonDiv, {
          theme: 'outline',
          size: 'large',
          text: 'continue_with',
        });
      }
    }
  }, [clientId]);

  return (
    <div className="mt-4 flex flex-col items-center">
      <div id="googleButtonDiv" />
    </div>
  );
}

export default OneTapGoogle;
