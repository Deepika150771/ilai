import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetails } from './pages/ProductDetails';
import { About } from './pages/About';
import { OrderTracking } from './pages/OrderTracking';
import { MyOrders } from './pages/MyOrders';
import { Contact } from './pages/Contact';
import { Cart } from './pages/Cart';
import { AdminPanel } from './pages/AdminPanel';

export function App() {
  const [activePage, setActivePage] = useState('home');

  // Listen to hash changes for deep linking (e.g., #/my-orders or #/tracking?query=#ILAI-001)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').split('?')[0];
      if (['home', 'shop', 'product', 'my-orders', 'about', 'tracking', 'contact', 'cart', 'admin'].includes(hash)) {
        setActivePage(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handlePageChange = (pageId) => {
    setActivePage(pageId);
    window.location.hash = `#/${pageId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home setActivePage={handlePageChange} />;
      case 'shop':
        return <Shop setActivePage={handlePageChange} />;
      case 'product':
        return <ProductDetails setActivePage={handlePageChange} />;
      case 'my-orders':
        return <MyOrders setActivePage={handlePageChange} />;
      case 'about':
        return <About setActivePage={handlePageChange} />;
      case 'tracking':
        return <OrderTracking />;
      case 'contact':
        return <Contact />;
      case 'cart':
        return <Cart setActivePage={handlePageChange} />;
      case 'admin':
        return <AdminPanel />;
      default:
        return <Home setActivePage={handlePageChange} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#F0F7F1] via-[#FAFCFA] to-[#EFF6F0] font-sans antialiased text-gray-800 selection:bg-emerald-200 selection:text-emerald-950">
      <Header activePage={activePage} setActivePage={handlePageChange} />
      
      <main className="flex-1">
        {renderPage()}
      </main>

      <Footer setActivePage={handlePageChange} />
    </div>
  );
}

export default App;
