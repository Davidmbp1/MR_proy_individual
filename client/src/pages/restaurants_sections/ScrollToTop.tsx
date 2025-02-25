// client/src/components/ScrollToTop.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Solo se ejecuta cuando cambia el pathname, no cuando solo cambia la query
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
