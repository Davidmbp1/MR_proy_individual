// client/src/pages/sections/Story.tsx
export const Story = () => {
  return (
    <section className="w-full flex flex-col items-center justify-center gap-y-10 py-16 bg-slate-100 px-4">
      <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold max-w-xl text-center text-blue-950 brightness-125">
        {/* Podrías manejar tu "Our_Story" con un span o pseudo-elemento */}
        A win-win for foodies and restaurants alike
      </h3>
      <p className="max-w-3xl text-center text-base sm:text-lg md:text-xl text-neutral-900">
        First Table was created by Mat Weir, a tech entrepreneur ...
      </p>
      <a 
        href="#" 
        className="px-8 sm:px-12 py-3 text-white bg-blue-950 font-bold brightness-125 hover:brightness-150 transition-colors"
      >
        Read more
      </a>
    </section>
  )
}
