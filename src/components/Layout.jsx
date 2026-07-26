import React, { memo, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';

const Layout = memo(() => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        <Outlet />
      </main>
        <Footer />
    </div>
  );
});

Layout.displayName = 'Layout';

export default Layout;
