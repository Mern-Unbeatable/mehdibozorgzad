import { NavLink, Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ROUTES } from '../../../../config';
import { useAuth } from '../../../../context/AuthContext';
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  FolderOpen,
  Settings,
  User,
  LogOut,
  X,
  ChevronsRight,
  ChevronsLeft,
} from 'lucide-react';

const LOGO_URL = '/logo.webp';

const NAV_ITEMS = [
  { name: 'Dashboard', path: ROUTES.ADMIN_DASHBOARD, icon: LayoutDashboard },
  { name: 'Products', path: ROUTES.ADMIN_PRODUCTS, icon: Package },
  { name: 'Leads & Enquiry', path: ROUTES.ADMIN_LEADS_ENQUIRY, icon: ClipboardList },
  { name: 'Project Gallery', path: ROUTES.ADMIN_GALLERY_ADMIN, icon: FolderOpen },
  { name: 'Settings', path: ROUTES.ADMIN_SETTINGS, icon: Settings },
  { name: 'Profile', path: ROUTES.ADMIN_PROFILE, icon: User },
];

const Sidebar = ({ onClose, onDesktopClose, isCollapsed, onExpand }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    toast.success('Signed out successfully');
    setTimeout(() => navigate(ROUTES.LOGIN), 900);
  };

  if (isCollapsed) {
    return (
      <div className="h-full w-full bg-[#161311] flex flex-col items-center border-r border-[#2a2421] py-3 gap-1">
        <button
          type="button"
          onClick={onExpand}
          title="Expand sidebar"
          aria-label="Expand sidebar"
          className="w-10 h-10 flex items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-[#1f1b18] transition-colors duration-200 mb-2 shrink-0"
        >
          <ChevronsRight size={20} aria-hidden="true" />
        </button>

        <nav
          className="flex-1 flex flex-col items-center gap-1 w-full px-2 overflow-y-auto"
          aria-label="Main navigation"
        >
          {NAV_ITEMS.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === ROUTES.ADMIN_DASHBOARD}
              title={name}
              onClick={onClose}
              className={({ isActive }) =>
                `w-10 h-10 flex items-center justify-center rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'bg-[#0d0b0a] text-white'
                    : 'text-white/70 hover:text-white hover:bg-[#1f1b18]'
                }`
              }
            >
              <Icon size={20} aria-hidden="true" />
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={handleLogout}
          title="Sign Out"
          aria-label="Sign Out"
          className="mt-1 w-10 h-10 flex items-center justify-center rounded-lg text-white/70 hover:text-red-400 hover:bg-red-500/10 transition-colors duration-200 shrink-0"
        >
          <LogOut size={20} aria-hidden="true" />
        </button>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-[#161311] flex flex-col border-r border-[#2a2421]">
      {/* Header */}
      <div className="flex items-start justify-between px-5 pt-5 pb-4 border-b border-[#2a2421] shrink-0">
        <Link to={ROUTES.HOME} className="cursor-pointer">
          <img
            src={LOGO_URL}
            alt="American Carpet and Flooring"
            width={120}
            height={51}
            className="h-12.75 w-30 object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </Link>
        <div className="flex items-center gap-1 mt-1">
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden p-1.5 -mr-1 rounded-md text-white/70 hover:text-white hover:bg-[#1f1b18] transition-colors"
            aria-label="Close navigation"
          >
            <X size={20} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onDesktopClose}
            className="hidden lg:flex items-center justify-center p-1.5 -mr-1 rounded-md text-white/70 hover:text-white hover:bg-[#1f1b18] transition-colors"
            aria-label="Collapse sidebar"
          >
            <ChevronsLeft size={20} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Main navigation">
        <ul className="space-y-1">
          {NAV_ITEMS.map(({ name, path, icon: Icon }) => (
            <li key={path}>
              <NavLink
                to={path}
                end={path === ROUTES.ADMIN_DASHBOARD}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-[#0d0b0a] text-white'
                      : 'text-white/70 hover:text-white hover:bg-[#1f1b18]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={20}
                      aria-hidden="true"
                      className={`shrink-0 transition-colors ${isActive ? 'text-white' : 'text-white/70'}`}
                    />
                    <span className="truncate flex-1 font-['Lato']">{name}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="shrink-0 border-t border-[#2a2421] px-3 py-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-3 cursor-pointer rounded-lg px-3 py-2.5 w-full text-base font-medium text-white/70 hover:text-red-400 hover:bg-red-500/10 transition-colors duration-200"
        >
          <LogOut size={20} aria-hidden="true" className="shrink-0" />
          <span className="font-['Lato']">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
