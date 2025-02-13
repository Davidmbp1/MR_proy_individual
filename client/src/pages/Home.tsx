import { StepGuide } from "../components/ui/stepGuide"
import { Hero } from "./sections/Hero"
import { CityRestaurants } from "./sections/cityResaurants"
import { Story } from "./sections/story"

function Home() {
  return (
    <div className="w-100dvw h-max">
      <Hero/>
      <StepGuide/>
      <CityRestaurants/>
      <Story/>
    </div>
  )
}

export default Home
