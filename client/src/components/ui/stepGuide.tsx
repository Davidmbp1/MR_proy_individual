import { Calendar, Savings, Map } from "../../assets/svg/svg"

export const StepGuide = () => {
  return (
    <section className="flex flex-row max-w-6xl mx-auto gap-x-8 py-16">
      <div className="flex flex-col gap-y-3 text-center items-center justify-center">
        <Map />
        <h3 className="text-2xl font-bold">Find a restaurant</h3>
        <p className="text-lg font-light">
          Find a new restaurant to try from over 2,300 restaurants globally
        </p>
      </div>
      <div className="flex flex-col gap-y-3 text-center items-center justify-center">
        <Calendar />
        <h3 className="text-2xl font-bold">Find a restaurant</h3>
        <p className="text-lg font-light">
          Find a new restaurant to try from over 2,300 restaurants globally
        </p>
      </div>
      <div className="flex flex-col gap-y-3 text-center items-center justify-center">
        <Savings />
        <h3 className="text-2xl font-bold">Find a restaurant</h3>
        <p className="text-lg font-light">
          Find a new restaurant to try from over 2,300 restaurants globally
        </p>
      </div>
    </section>   
  )
}