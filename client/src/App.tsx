// client/src/App.tsx
import { Routes, Route } from 'react-router-dom';
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import ScrollPreserver from './pages/restaurants_sections/ScrollToTop';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CompleteProfile from './pages/CompleteProfile';
import Restaurants from './pages/Restaurants';
import OfferDetail from './pages/OfferDetail';
import CheckoutSuccess from './pages/CheckoutSuccess';
import CheckoutCancel from './pages/CheckoutCancel';
import Faq from './pages/Faq';
import Story from './pages/Story';
import Review from './pages/Review';
import SellerLanding from './pages/SellerLanding';

function App() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <ScrollPreserver />
      <AnnouncementBar />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/restaurants/:restaurantId/offer/:offerId" element={<OfferDetail />} />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
        <Route path="/checkout/cancel" element={<CheckoutCancel />} />
        <Route path="/reviews/:restaurantId" element={<Review />} />
        <Route path="/faqs" element={<Faq />} />
        <Route path="/story" element={<Story />} />
        <Route path="/seller" element={<SellerLanding />} />
      </Routes>
    </div>
  );
}

export default App;
