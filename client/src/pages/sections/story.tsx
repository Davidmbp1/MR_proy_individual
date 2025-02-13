export const Story = () => {
  return (
    <section className="w-full flex flex-col items-center justify-center gap-y-10 py-16 bg-slate-100">
      <h3 className="text-5xl font-bold max-w-xl text-center text-blue-950 brightness-125 before:content-['Our_Story'] before:block before:text-neutral-500 before:mb-4 before:text-2xl before:font-normal">
        A win-win for foodies and restaurants alike
      </h3>
      <p className="max-w-3xl text-center text-xl text-neutral-900">
        First Table was created by Mat Weir, a tech entrepreneur who wanted to solve the problem of slow starts to evenings at restaurants. From humble beginnings as a one-man-band in Queenstown, our Kiwi founder embarked on a journey to build a creative solution that would be a win-win experience for foodies and restaurants alike.
      </p>
      <a href="#" className="px-12 py-3.5 text-white bg-blue-950 font-bold brightness-125 hover:brightness-150 duration-200 transition-colors">
        Read more
      </a>
    </section>
  )
}
