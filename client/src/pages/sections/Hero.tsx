// client/src/pages/sections/Hero.tsx
export const Hero = () => {
  return (
    <section className="relative h-[calc(100vh-64px)]">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 -z-10">
        <img 
          src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="restaurant" 
          className="w-full h-full object-cover brightness-50"
        />
      </div>

      {/* SVG wave en la parte inferior */}
      <div className="absolute bottom-0 w-full">
        <svg width="100%" viewBox="0 0 1600 86" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M800 54.0001C186 145 0 14.0001 0 14.0001V154H1600V14.0001C1600 14.0001 1555.81 1.88336 1439.4 0H1376.03C1251.01 1.84955 1065.53 14.6465 800 54.0001Z" fill="#fff"></path>
        </svg>
      </div>

      {/* Contenido */}
      <div className="relative z-10 w-full h-full max-w-4xl mx-auto flex flex-col items-center justify-center text-white px-4">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-center">
          Dine early and save 50% off your food bill
        </h1>
        <p className="pt-4 text-base sm:text-lg max-w-3xl text-center">
          Book a first table at thousands of restaurants and enjoy 50% off the food bill for two, three, or four people!
        </p>
      </div>
    </section>
  )
}
