import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MegaphoneIcon, XMarkIcon } from '@heroicons/react/24/solid'

function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-gradient-to-r from-green-500 to-green-400 text-white px-4 py-2 flex items-center justify-center relative">
      {/* Ícono de anuncio */}
      <MegaphoneIcon className="h-5 w-5 mr-2" aria-hidden="true" />
      
      {/* Texto principal */}
      <span className="mr-2">
        <span className="font-bold">NEW!</span> Save your fave restaurants in the LastMinuteFoods app, and be in to{' '}
        <span className="font-bold underline">WIN!</span>
      </span>
      
      {/* Botón tipo enlace para más información */}
      <Link 
        to="/learn-more" 
        className="bg-white text-green-600 font-semibold px-2 py-1 rounded hover:bg-green-50 transition-colors text-sm"
      >
        Learn more
      </Link>
      
      {/* Emoji de celebración */}
      <span className="ml-2" role="img" aria-label="tada">🎉</span>
      
      {/* Botón para cerrar el anuncio */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 text-white hover:text-gray-100 transition-colors"
        aria-label="Close announcement"
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  )
}

export default AnnouncementBar
