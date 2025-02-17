// client/src/pages/Home.tsx

import { StepGuide } from "../components/ui/stepGuide"
import { Hero } from "./sections/Hero"
import { CityRestaurants } from "./sections/cityResaurants"
import { Story } from "./sections/story"

function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <StepGuide />
      <CityRestaurants />
      <Story />
    </div>
  )
}

export default Home