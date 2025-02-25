// client/src/pages/Home.tsx

// Import de tus secciones
import HeroMain from './home_sections/HeroMain'
import { StepGuide } from '../components/ui/stepGuide' // Import nombrado
import CityRestaurants from './home_sections/cityResaurants';
import CommunityCTA from './home_sections/CommunityCTA'
import StorySection from './home_sections/StorySection'
import FooterSection from './home_sections/FooterSection'

function Home() {
  return (
    <div className="flex flex-col">
      <HeroMain />
      <StepGuide />
      <CityRestaurants />
      <CommunityCTA />
      <StorySection />
      <FooterSection />
    </div>
  )
}

export default Home
