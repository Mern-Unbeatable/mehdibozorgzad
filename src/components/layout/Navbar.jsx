import React, { memo, useCallback, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LogIn, Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../config';

const LOGO_URL = '/logo.webp';

const WHY_CHOOSE_US_ITEMS = [
  { label: 'About Us', to: ROUTES.ABOUT },
  { label: 'Choose Abbey', to: ROUTES.CHOOSE_ABBEY },
  { label: 'The Experience', to: ROUTES.THE_EXPERIENCE },
  { label: 'Lifetime Warranty', to: ROUTES.LIFETIME_WARRANTY },
  { label: '60 Day Guarentee', to: ROUTES.SIXTY_DAY_GUARANTEE },
];

const NAV_LINKS = [
  { label: 'Flooring', to: ROUTES.FLOORING },
  { label: 'Construction', to: ROUTES.CONSTRUCTION },
  { label: 'Why Choose Us', dropdown: WHY_CHOOSE_US_ITEMS },
  { label: 'Services', to: ROUTES.SERVICES },
  { label: 'Project Gallery', to: ROUTES.PROJECT_GALLERY },
  { label: 'Our Locations', to: ROUTES.OUR_LOCATIONS },
];

const linkBase =
  "font-['Lato'] font-medium text-base text-[#1a1a1a] hover:text-[#57534d] transition-colors duration-150 px-2.5 py-2.5";

const mobileLinkBase =
  "block font-['Lato'] font-medium text-base text-[#1a1a1a] px-4 py-3 hover:bg-gray-50 transition-colors duration-150";

const navLinkClass = ({ isActive }) =>
  isActive
    ? `font-['Lato'] font-medium text-base text-white bg-[#161311] rounded px-2.5 py-2.5 transition-colors duration-150`
    : linkBase;

const mobileNavLinkClass = ({ isActive }) =>
  isActive ? `${mobileLinkBase} font-semibold bg-gray-50` : mobileLinkBase;

const NavItem = memo(({ item, mobile, onClick }) => {
  const [dropOpen, setDropOpen] = useState(false);

  if (item.dropdown) {
    if (mobile) {
      return (
        <div>
          <button
            type="button"
            onClick={() => setDropOpen((value) => !value)}
            className={`${mobileLinkBase} flex w-full items-center justify-between`}
          >
            {item.label}
            <ChevronDown
              size={14}
              aria-hidden="true"
              className={`transition-transform duration-200 ${dropOpen ? 'rotate-180' : ''}`}
            />
          </button>
          {dropOpen && (
            <div className="bg-gray-50/50">
              {item.dropdown.map((subItem) => (
                <NavLink
                  key={subItem.label}
                  to={subItem.to}
                  className={({ isActive }) =>
                    `${mobileLinkBase} pl-8 ${isActive ? 'font-semibold text-black' : 'text-gray-600'}`
                  }
                  onClick={onClick}
                >
                  {subItem.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="group relative">
        <button type="button" className={`${linkBase} flex items-center gap-1`}>
          {item.label}
          <ChevronDown
            size={13}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:rotate-180"
          />
        </button>
        <div className="invisible absolute left-0 top-full z-50 w-53.75 rounded-lg border border-[#ded9d9] bg-white opacity-0 shadow-md transition-all duration-200 group-hover:visible group-hover:opacity-100">
          {item.dropdown.map((subItem) => (
            <NavLink
              key={subItem.label}
              to={subItem.to}
              className={({ isActive }) =>
                `block cursor-pointer px-2.5 py-2 font-['Lato'] text-base transition-colors ${
                  isActive ? 'bg-[#202020] text-white' : 'text-[#141414] hover:bg-gray-50'
                }`
              }
              onClick={onClick}
            >
              {subItem.label}
            </NavLink>
          ))}
        </div>
      </div>
    );
  }

  if (item.to) {
    return (
      <NavLink
        to={item.to}
        className={mobile ? mobileNavLinkClass : navLinkClass}
        onClick={onClick}
      >
        {item.label}
      </NavLink>
    );
  }

  return (
    <a href={item.href} className={mobile ? mobileLinkBase : linkBase} onClick={onClick}>
      {item.label}
    </a>
  );
});

NavItem.displayName = 'NavItem';

const Navbar = memo(() => {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const { isAuthenticated } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm" aria-label="Main navigation">
      <div className="relative border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-5">
            <Link
              to={ROUTES.HOME}
              aria-label="American Carpet and Flooring Home"
              className="shrink-0"
              onClick={closeMenu}
            >
              <img
                src={LOGO_URL}
                alt="American Carpet and Flooring"
                width={120}
                height={51}
                className="h-12.75 w-30 object-contain"
              />
            </Link>

            {/* Desktop Navigation (Visible only on xl and above) */}
            <div className="hidden items-center gap-3 xl:flex">
              {NAV_LINKS.map((item) => (
                <NavItem key={item.label} item={item} mobile={false} />
              ))}
              {isAuthenticated ? (
                <Link
                  to={ROUTES.ADMIN_DASHBOARD}
                  className="flex items-center gap-2 rounded-lg border border-[#1a1a1a] px-4 py-2 text-sm font-medium text-[#1a1a1a] transition-colors hover:bg-gray-50"
                >
                  Admin Dashboard
                </Link>
              ) : (
                <Link
                  to={ROUTES.LOGIN}
                  className="flex items-center gap-2 rounded-lg border border-[#1a1a1a] px-4 py-2 text-sm font-medium text-[#1a1a1a] transition-colors hover:bg-gray-50"
                >
                  <LogIn size={15} aria-hidden="true" />
                  Login
                </Link>
              )}
            </div>

            {/* Mobile/Tablet Menu Button (Visible up to xl device) */}
            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="rounded-lg p-2 text-[#1a1a1a] transition-colors hover:bg-gray-100 xl:hidden"
            >
              {menuOpen ? (
                <X size={24} aria-hidden="true" />
              ) : (
                <Menu size={24} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Overlay (Visible up to xl device) */}
        <div
          id="mobile-menu"
          className={`absolute left-0 right-0 top-full flex w-full flex-col overflow-y-auto bg-white shadow-lg transition-all duration-300 ease-in-out xl:hidden ${
            menuOpen
              ? 'max-h-[calc(100vh-85px)] border-b border-gray-100 opacity-100 visible'
              : 'max-h-0 opacity-0 invisible'
          }`}
        >
          <div className="flex flex-col py-2">
            {NAV_LINKS.map((item) => (
              <NavItem key={item.label} item={item} mobile onClick={closeMenu} />
            ))}
            <div className="px-4 py-4 mt-2 border-t border-gray-100">
              {isAuthenticated ? (
                <Link
                  to={ROUTES.ADMIN_DASHBOARD}
                  onClick={closeMenu}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#1a1a1a] px-4 py-2.5 text-base font-medium text-[#1a1a1a] transition-colors hover:bg-gray-50"
                >
                  Admin Dashboard
                </Link>
              ) : (
                <Link
                  to={ROUTES.LOGIN}
                  onClick={closeMenu}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#1a1a1a] px-4 py-2.5 text-base font-medium text-[#1a1a1a] transition-colors hover:bg-gray-50"
                >
                  <LogIn size={18} aria-hidden="true" />
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
