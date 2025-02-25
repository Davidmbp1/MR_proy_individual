import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'

interface SlideContent {
  title: string
  description: string
  svgPath: string // Path del ícono en formato SVG
  bgColor: string // Clase de fondo del círculo
  textColor: string // Clase de color para el ícono
}

const slidesData: SlideContent[] = [
  {
    title: 'Save Money',
    description:
      'Enjoy huge discounts on high-quality meals that would otherwise go unsold.',
    svgPath:
      'M17 9V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2m0-4h4m-2 2v.01',
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-500',
  },
  {
    title: 'Protect the Planet',
    description:
      'Help reduce food waste by giving perfectly good food a second chance.',
    svgPath:
      'M12 3c4.41 0 8 3.59 8 8s-3.59 8-8 8S4 15.41 4 11s3.59-8 8-8zm0 0v2m4.24 1.76l-1.42 1.42M12 17v2m4.24-1.76l1.42-1.42M7.76 6.24l1.42 1.42',
    bgColor: 'bg-green-100',
    textColor: 'text-green-600',
  },
  {
    title: 'Build Community',
    description:
      'Support local businesses and join a network of eco-conscious food lovers.',
    svgPath:
      'M17 20h5v-2a2 2 0 0 0-2-2h-3 M2 20h5v-2a2 2 0 0 0-2-2H2 m4-5a2 2 0 1 0 0-4 m12 4a2 2 0 1 0 0-4 m-6 1a2 2 0 1 0 0-4 m-2 9h4a2 2 0 0 1 2 2v1H7v-1a2 2 0 0 1 2-2z',
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-500',
  },
]

function StorySection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [manualInteractionCount, setManualInteractionCount] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesData.length)
    }, 3000)
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [manualInteractionCount])

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slidesData.length) % slidesData.length)
    setManualInteractionCount((count) => count + 1)
  }

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slidesData.length)
    setManualInteractionCount((count) => count + 1)
  }

  const handleDotClick = (index: number) => {
    setCurrentSlide(index)
    setManualInteractionCount((count) => count + 1)
  }

  return (
    <section className="relative overflow-hidden bg-orange-50 py-16">
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-orange-200 opacity-70 rounded-full transform rotate-12" />
      <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-orange-300 opacity-60 rounded-full transform rotate-45" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 flex flex-col items-center text-center space-y-8">
        <div className="max-w-4xl space-y-4">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-orange-900">
            Our Story
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-800 leading-relaxed">
            Founded by <span className="font-semibold text-orange-800">David Bustos</span>, our platform helps restaurants and stores sell soon-to-expire food at great discounts. Diners save money while helping to reduce food waste and protect the environment.
          </p>
        </div>

        <div className="relative w-full max-w-2xl h-96 overflow-hidden">
          {slidesData.map((slide, index) => (
            <div
              key={index}
              className={`
                absolute w-full h-full top-0 left-0 flex flex-col 
                items-center justify-center transition-opacity duration-700 ease-in-out 
                ${index === currentSlide ? 'opacity-100 z-20' : 'opacity-0 z-10 pointer-events-none'}
              `}
            >
              <div className="flex flex-col items-center space-y-6 px-4">
                <div className={`
                  ${slide.bgColor} ${slide.textColor} 
                  w-20 h-20 rounded-full flex items-center justify-center shadow
                `}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={slide.svgPath} />
                  </svg>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-orange-900">
                  {slide.title}
                </h3>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-xl leading-relaxed">
                  {slide.description}
                </p>
              </div>
            </div>
          ))}

          <button
            onClick={handlePrev}
            className="absolute z-30 top-1/2 left-4 -translate-y-1/2 bg-white text-gray-600 rounded-full p-3 shadow hover:bg-gray-100 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="absolute z-30 top-1/2 right-4 -translate-y-1/2 bg-white text-gray-600 rounded-full p-3 shadow hover:bg-gray-100 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="flex space-x-3">
          {slidesData.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className={`
                w-4 h-4 rounded-full focus:outline-none
                ${i === currentSlide ? 'bg-orange-800' : 'bg-orange-300 hover:bg-orange-400'}
              `}
            />
          ))}
        </div>

        <Link
          to="/story"
          className="px-8 sm:px-12 py-3 text-white bg-orange-800 font-bold rounded hover:bg-orange-900 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 mt-4 text-lg"
        >
          Learn more about our journey
        </Link>
      </div>
    </section>
  )
}

export default StorySection;
