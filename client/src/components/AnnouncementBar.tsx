// client/src/components/AnnouncementBar.tsx

import { Link } from 'react-router-dom'

function AnnouncementBar() {
  return (
    <div className="bg-green-300 text-center text-white py-2 px-4 text-sm">
      <span className="font-semibold">NEW!</span> Save your fave restaurants in the LastMinuteFoods app, and be in to WIN!
      <Link to="/learn-more" className="underline ml-1">Learn more</Link> 
      <span role="img" aria-label="tada" className="ml-1">🎉</span>
    </div>
  )
}

export default AnnouncementBar