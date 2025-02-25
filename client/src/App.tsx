// client/src/App.tsx

import { Routes, Route } from 'react-router-dom';
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import ScrollPreserver from './pages/restaurants_sections/ScrollToTop';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
// Cambiamos "CompleteProfile" por "Profile" (o lo que prefieras nombrarlo)
import Profile from './pages/Profile'; 
import Restaurants from './pages/Restaurants';
import CheckoutSuccess from './pages/CheckoutSuccess';
import CheckoutCancel from './pages/CheckoutCancel';
import OfferDetail from './pages/OfferDetail';

// Importamos la página FAQ y Story si las has creado
import Faq from './pages/Faq';
import Story from './pages/Story'; 
// Si todavía no existen, créalas o usa placeholders

function App() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <ScrollPreserver /> {/* Asegura scroll to top al cambiar de ruta */}
      <AnnouncementBar />
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Perfil (antes /complete-profile) */}
        <Route path="/profile" element={<Profile />} />
        
        {/* Restaurantes */}
        <Route path="/restaurants" element={<Restaurants />} />
        <Route 
          path="/restaurants/:restaurantId/offer/:offerId" 
          element={<OfferDetail />} 
        />

        {/* Checkout (Stripe) */}
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
        <Route path="/checkout/cancel" element={<CheckoutCancel />} />

        {/* Otras secciones */}
        <Route path="/faqs" element={<Faq />} />
        <Route path="/story" element={<Story />} />
      </Routes>
    </div>
  );
}

export default App;
