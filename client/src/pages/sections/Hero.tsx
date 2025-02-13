export const Hero = () => {
  return (
    <section className="h-[calc(100vh-64px)]">
      <div className="-z-10 absolute top-0 left-0 w-full h-screen">
        <img src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="restaurant" className="h-full w-full object-cover brightness-50" />
      </div>
      <div className="absolute bottom-0 w-full">
        <svg width="100%" viewBox="0 0 1600 86" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M800 54.0001C186 145 0 14.0001 0 14.0001V154H1600V14.0001C1600 14.0001 1555.81 1.88336 1439.4 0H1376.03C1251.01 1.84955 1065.53 14.6465 800 54.0001Z" fill="#fff"></path></svg>
      </div>
      <div className="z-10 text-white relative w-full h-full max-w-4xl mx-auto flex flex-col items-center justify-center">
        <h1 className="text-7xl font-bold text-center">Dine early and save 50% off your food bill</h1>
        <p className="pt-4 text-lg max-w-3xl text-center">
          Book a first table at thousands of restaurants and enjoy 50% off the food bill for two, three, or four people!
        </p>
      </div>
    </section>
  )
}