import React, { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  Link,
  useLocation,
  useRouteError,
} from 'react-router-dom';
import Layout from '../components/Layout';
import AdminLayout from '../components/layout/admin/Layout';
import { ROUTES } from '../config';
import { useAuth } from '../context/AuthContext';

const RouteErrorFallback = () => {
  const error = useRouteError();
  if (import.meta.env.DEV) {
    console.error('[RouteError]', error);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fbfdff] p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="font-['Playfair_Display'] text-2xl font-bold text-[#0d0b0a] mb-2">Something went wrong</h1>
        <p className="font-['Lato'] text-gray-600 text-sm mb-6">An unexpected error occurred while rendering this page.</p>
        {import.meta.env.DEV && error?.message && (
          <pre className="text-left text-xs bg-red-50 text-red-700 p-3 rounded-xl mb-6 overflow-auto max-h-36 font-mono">
            {error.message}
          </pre>
        )}
        <div className="flex gap-3 justify-center">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 bg-[#0d0b0a] hover:bg-[#2c2925] text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
          >
            Reload Page
          </button>
          <a
            href={ROUTES.HOME}
            className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

// Derive a relative segment from an absolute admin route path
const seg = (route) => route.replace(`${ROUTES.ADMIN}/`, '');

const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Contact = lazy(() => import('../pages/Contact'));
const Services = lazy(() => import('../pages/Services'));
const Flooring = lazy(() => import('../pages/Flooring'));
const LovedProducts = lazy(() => import('../pages/LovedProducts'));
const CarpetSale = lazy(() => import('../pages/CarpetSale'));
const HardwoodSale = lazy(() => import('../pages/HardwoodSale'));
const LuxuryVinylSale = lazy(() => import('../pages/LuxuryVinylSale'));
const Savings = lazy(() => import('../pages/Savings'));
const Financing = lazy(() => import('../pages/Financing'));
const Construction = lazy(() => import('../pages/Construction'));
const Login = lazy(() => import('../pages/Login'));
const ChooseAbbey = lazy(() => import('../pages/ChooseAbbey'));
const TheExperience = lazy(() => import('../pages/TheExperience'));
const LifetimeWarranty = lazy(() => import('../pages/LifetimeWarranty'));
const SixtyDayGuarantee = lazy(() => import('../pages/SixtyDayGuarantee'));
const CoretecFlooring = lazy(() => import('../pages/CoretecFlooring'));
const WaterproofFlooring = lazy(() => import('../pages/WaterproofFlooring'));
const CustomCabinets = lazy(() => import('../pages/CustomCabinets'));
const PremiumCountertops = lazy(() => import('../pages/PremiumCountertops'));
const HomeRemodeling = lazy(() => import('../pages/HomeRemodeling'));
const ProjectGallery = lazy(() => import('../pages/ProjectGallery'));
const ProjectDetail = lazy(() => import('../pages/ProjectDetail'));
const OurLocations = lazy(() => import('../pages/OurLocations'));

// Admin pages — each lazy-loaded so they only download when visited
const Dashboard = lazy(() => import('../pages/admin/Dashboard'));
const Emails = lazy(() => import('../pages/admin/Emails'));
const Leads = lazy(() => import('../pages/admin/Leads'));
const Orders = lazy(() => import('../pages/admin/Orders'));
const MarketplaceOrders = lazy(() => import('../pages/admin/MarketplaceOrders'));
const CaseStudies = lazy(() => import('../pages/admin/CaseStudies'));
const Blog = lazy(() => import('../pages/admin/Blog'));
const Jobs = lazy(() => import('../pages/admin/Jobs'));
const Pricing = lazy(() => import('../pages/admin/Pricing'));
const AdminMessages = lazy(() => import('../pages/admin/Messages'));
const AdminProducts = lazy(() => import('../pages/admin/Products'));
const AdminProductDetail = lazy(() => import('../pages/admin/ProductDetail'));
const AddProduct = lazy(() => import('../pages/admin/AddProduct'));
const LeadsEnquiry = lazy(() => import('../pages/admin/LeadsEnquiry'));
const AdminSettings = lazy(() => import('../pages/admin/Settings'));
const AdminProfile = lazy(() => import('../pages/admin/Profile'));
const AdminGallery = lazy(() => import('../pages/admin/AdminProjectGallery'));
const AddProjectGallery = lazy(() => import('../pages/admin/AddProjectGallery'));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-center px-4">
    <h1 className="text-6xl font-bold text-gray-800">404</h1>
    <p className="text-xl text-gray-500">Page not found</p>
    <Link to={ROUTES.HOME} className="mt-2 text-blue-600 hover:underline text-sm font-medium">
      Back to Home
    </Link>
  </div>
);

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <PageLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return children;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        errorElement={<RouteErrorFallback />}
        element={
          <Suspense fallback={<PageLoader />}>
            <Layout />
          </Suspense>
        }
      >
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.ABOUT} element={<About />} />
        <Route path={ROUTES.CHOOSE_ABBEY} element={<ChooseAbbey />} />
        <Route path={ROUTES.THE_EXPERIENCE} element={<TheExperience />} />
        <Route path={ROUTES.LIFETIME_WARRANTY} element={<LifetimeWarranty />} />
        <Route path={ROUTES.SIXTY_DAY_GUARANTEE} element={<SixtyDayGuarantee />} />
        <Route path={ROUTES.SERVICES} element={<Services />} />
        <Route path={ROUTES.CONTACT} element={<Contact />} />
        <Route path={ROUTES.FLOORING_PRODUCT} element={<Flooring />} />
        <Route path={ROUTES.FLOORING} element={<Flooring />} />
        <Route path={ROUTES.LOVED_PRODUCTS} element={<LovedProducts />} />
        <Route path={ROUTES.CARPET_SALE} element={<CarpetSale />} />
        <Route path={ROUTES.HARDWOOD_SALE} element={<HardwoodSale />} />
        <Route path={ROUTES.LUXURY_VINYL_SALE} element={<LuxuryVinylSale />} />
        <Route path={ROUTES.SAVINGS} element={<Savings />} />
        <Route path={ROUTES.FINANCING} element={<Financing />} />
        <Route path={ROUTES.CONSTRUCTION} element={<Construction />} />
        <Route path={ROUTES.CORETEC_FLOORING} element={<CoretecFlooring />} />
        <Route path={ROUTES.WATERPROOF_FLOORING} element={<WaterproofFlooring />} />
        <Route path={ROUTES.CUSTOM_CABINETS} element={<CustomCabinets />} />
        <Route path={ROUTES.PREMIUM_COUNTERTOPS} element={<PremiumCountertops />} />
        <Route path={ROUTES.HOME_REMODELING} element={<HomeRemodeling />} />
        <Route path={ROUTES.PROJECT_GALLERY} element={<ProjectGallery />} />
        <Route path={ROUTES.PROJECT_DETAIL} element={<ProjectDetail />} />
        <Route path={ROUTES.OUR_LOCATIONS} element={<OurLocations />} />
      </Route>

      <Route
        path={ROUTES.LOGIN}
        errorElement={<RouteErrorFallback />}
        element={
          <Suspense fallback={<PageLoader />}>
            <Login />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.ADMIN}
        errorElement={<RouteErrorFallback />}
        element={
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          </Suspense>
        }
      >
        <Route index element={<Navigate to={ROUTES.ADMIN_DASHBOARD} replace />} />
        <Route path={seg(ROUTES.ADMIN_DASHBOARD)} element={<Dashboard />} />
        <Route path={seg(ROUTES.ADMIN_EMAILS)} element={<Emails />} />
        <Route path={seg(ROUTES.ADMIN_LEADS)} element={<Leads />} />
        <Route path={seg(ROUTES.ADMIN_ORDERS)} element={<Orders />} />
        <Route path={seg(ROUTES.ADMIN_MARKETPLACE_ORDERS)} element={<MarketplaceOrders />} />
        <Route path={seg(ROUTES.ADMIN_CASE_STUDIES)} element={<CaseStudies />} />
        <Route path={seg(ROUTES.ADMIN_BLOG)} element={<Blog />} />
        <Route path={seg(ROUTES.ADMIN_JOBS)} element={<Jobs />} />
        <Route path={seg(ROUTES.ADMIN_PRICING)} element={<Pricing />} />
        <Route path={seg(ROUTES.ADMIN_MESSAGES)} element={<AdminMessages />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="products/add" element={<AddProduct />} />
        <Route path="products/:id" element={<AdminProductDetail />} />
        <Route path={seg(ROUTES.ADMIN_LEADS_ENQUIRY)} element={<LeadsEnquiry />} />
        <Route path={seg(ROUTES.ADMIN_SETTINGS)} element={<AdminSettings />} />
        <Route path={seg(ROUTES.ADMIN_PROFILE)} element={<AdminProfile />} />
        <Route path={seg(ROUTES.ADMIN_GALLERY_ADMIN)} element={<AdminGallery />} />
        <Route path={seg(ROUTES.ADMIN_GALLERY_ADD)} element={<AddProjectGallery />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </>,
  ),
);

export default router;
