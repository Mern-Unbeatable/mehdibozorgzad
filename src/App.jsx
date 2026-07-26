import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from './components/ErrorBoundary';
import router from './router/router';
import { TOAST_CONFIG } from './config';
import { AuthProvider } from './context/AuthProvider';
import { WishlistProvider } from './context/WishlistContext';
import { EnquiryProvider } from './context/EnquiryProvider';
import { ProjectsProvider } from './context/ProjectsProvider';
import { ProductsProvider } from './context/ProductsProvider';
import { SettingsProvider } from './context/SettingsProvider';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <EnquiryProvider>
        <ProjectsProvider>
          <ProductsProvider>
            <SettingsProvider>
              <WishlistProvider>
                <ErrorBoundary>
                  <RouterProvider router={router} />
                  <Toaster
                    position={TOAST_CONFIG.POSITION}
                    toastOptions={{ duration: TOAST_CONFIG.DURATION }}
                  />
                </ErrorBoundary>
              </WishlistProvider>
            </SettingsProvider>
          </ProductsProvider>
        </ProjectsProvider>
      </EnquiryProvider>
    </AuthProvider>
  );
}

export default App;
