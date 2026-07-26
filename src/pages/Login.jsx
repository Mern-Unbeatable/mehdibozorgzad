import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ROUTES } from '../config';
import { useAuth } from '../context/AuthContext';
import { LogIn, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

// Same logo used in the main navbar
const LOGO_URL = '/logo.webp';

const FEATURES = [
  'Expert flooring installation since 1981',
  'Serving Torrance, Gardena & surrounding areas',
  'Trusted by thousands of residential & commercial clients',
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REMEMBER_LOGIN_KEY = 'rememberLoginCredentials';
const REMEMBERED_EMAIL_KEY = 'rememberedLoginEmail';
const REMEMBERED_PASSWORD_KEY = 'rememberedLoginPassword';

const loadRememberedCredentials = () => {
  if (typeof window === 'undefined') {
    return { rememberMe: false, email: '', password: '' };
  }

  try {
    const rememberMe = localStorage.getItem(REMEMBER_LOGIN_KEY) === 'true';
    if (!rememberMe) {
      return { rememberMe: false, email: '', password: '' };
    }

    return {
      rememberMe: true,
      email: localStorage.getItem(REMEMBERED_EMAIL_KEY) || '',
      password: localStorage.getItem(REMEMBERED_PASSWORD_KEY) || '',
    };
  } catch {
    return { rememberMe: false, email: '', password: '' };
  }
};

const persistRememberedCredentials = ({ rememberMe, email, password }) => {
  if (typeof window === 'undefined') return;

  if (rememberMe) {
    localStorage.setItem(REMEMBER_LOGIN_KEY, 'true');
    localStorage.setItem(REMEMBERED_EMAIL_KEY, email);
    localStorage.setItem(REMEMBERED_PASSWORD_KEY, password);
    return;
  }

  localStorage.removeItem(REMEMBER_LOGIN_KEY);
  localStorage.removeItem(REMEMBERED_EMAIL_KEY);
  localStorage.removeItem(REMEMBERED_PASSWORD_KEY);
};

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login: loginRequest } = useAuth();

  const remembered = loadRememberedCredentials();

  const [email, setEmail] = useState(remembered.email);
  const [password, setPassword] = useState(remembered.password);
  const [rememberMe, setRememberMe] = useState(remembered.rememberMe);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!email.trim()) {
      errs.email = 'Email is required.';
    } else if (!EMAIL_REGEX.test(email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!password) {
      errs.password = 'Password is required.';
    }
    return errs;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setIsLoading(true);
    try {
      const result = await loginRequest(email, password);

      if (!result.success) {
        setErrors({ form: result.error });
        return;
      }

      persistRememberedCredentials({ rememberMe, email, password });
      const destination = location.state?.from?.pathname ?? ROUTES.ADMIN_DASHBOARD;
      navigate(destination, { replace: true });
    } catch (error) {
      const message = (error?.message || '').toLowerCase();
      const isNetworkLikeError =
        message.includes('network') ||
        message.includes('cors') ||
        message.includes('failed to fetch') ||
        message.includes('timeout');

      setErrors({
        form: isNetworkLikeError
          ? 'Unable to reach the server. Please try again in a few moments.'
          : error?.message || 'Login failed. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-dvh flex flex-col lg:flex-row">
      {/* ── Left panel ── */}
      <div className="hidden lg:flex lg:w-[52%] bg-[#0d0b0a] flex-col justify-center p-14 relative overflow-hidden shrink-0">
        {/* Subtle warm glow accents */}
        <div className="absolute -top-32 -left-32 w-125 h-125 rounded-full bg-[#4c4946]/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#696664]/10 blur-3xl pointer-events-none" />

        {/* Hero copy */}
        <div className="relative z-10 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <p className="text-white/80 font-['Lato'] font-medium text-sm uppercase tracking-widest">
              Admin Dashboard
            </p>
            <h1 className="font-['Playfair_Display'] font-semibold text-white text-5xl xl:text-[52px] leading-tight">
              Welcome
              <br />
              back.
            </h1>
            <p className="font-['Lato'] text-base text-white/60 leading-7 max-w-xs">
              Sign in to manage your orders, leads, and platform settings from one powerful place.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {FEATURES.map((feat) => (
              <div key={feat} className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-white/80 shrink-0" aria-hidden="true" />
                <span className="font-['Lato'] text-base text-white/60">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer credit */}
        <p className="absolute bottom-10 left-14 z-10 font-['Lato'] text-sm text-white/60">
          American Carpet &amp; Flooring Since 1981
        </p>
      </div>

      {/* ── Right panel ── */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-[#f0eeec] shrink-0">
          <Link to={ROUTES.HOME} aria-label="American Carpet and Flooring Home">
            <img
              src={LOGO_URL}
              alt="American Carpet and Flooring"
              width={120}
              height={51}
              className="h-12.75 w-30 object-contain"
            />
          </Link>
          <Link
            to={ROUTES.HOME}
            className="font-['Lato'] text-base text-[#4c4946] hover:text-[#0d0b0a] transition-colors flex items-center gap-1.5"
          >
            &larr; Back to Home
          </Link>
        </header>

        {/* Form area */}
        <div className="flex-1 flex items-center justify-center px-6 py-12 md:px-12">
          <div className="w-full max-w-sm">
            {/* Heading */}
            <div className="mb-8">
              <h2 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-3xl md:text-4xl leading-tight mb-2">
                Sign in to your account
              </h2>
              <p className="font-['Lato'] text-base text-[#696664] leading-6">
                Enter your credentials to continue to the dashboard.
              </p>
            </div>

            {/* Form error */}
            {errors.form && (
              <div
                role="alert"
                className="bg-red-50 border border-red-200 text-red-700 font-['Lato'] text-base rounded-lg px-4 py-3 mb-6"
              >
                {errors.form}
              </div>
            )}

            <form onSubmit={handleLogin} noValidate className="flex flex-col gap-5">
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="font-['Lato'] font-medium text-base text-[#0d0b0a]"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={`w-full px-4 py-3 bg-white border rounded-lg font-['Lato'] text-base text-[#0d0b0a] placeholder-[#696664] focus:outline-none focus:ring-2 focus:ring-[#0d0b0a]/15 focus:border-[#0d0b0a] transition-all ${
                    errors.email ? 'border-red-400' : 'border-[#d6d3d1]'
                  }`}
                />
                {errors.email && (
                  <p id="email-error" className="font-['Lato'] text-sm text-red-600 mt-0.5">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="password"
                  className="font-['Lato'] font-medium text-base text-[#0d0b0a]"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••"
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? 'password-error' : undefined}
                    className={`w-full px-4 py-3 pr-11 bg-white border rounded-lg font-['Lato'] text-base text-[#0d0b0a] placeholder-[#696664] focus:outline-none focus:ring-2 focus:ring-[#0d0b0a]/15 focus:border-[#0d0b0a] transition-all ${
                      errors.password ? 'border-red-400' : 'border-[#d6d3d1]'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#696664] hover:text-[#0d0b0a] transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p id="password-error" className="font-['Lato'] text-sm text-red-600 mt-0.5">
                    {errors.password}
                  </p>
                )}
              </div>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-[#d6d3d1] text-[#0d0b0a] focus:ring-[#0d0b0a]/20 cursor-pointer"
                />
                <span className="font-['Lato'] text-sm text-[#4c4946]">
                  Remember email and password on this device
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#0d0b0a] hover:bg-[#1f1b18] disabled:opacity-60 disabled:cursor-not-allowed text-white font-['Lato'] font-medium text-base py-3.5 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer mt-1"
              >
                {isLoading ? (
                  <span
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                    aria-hidden="true"
                  />
                ) : (
                  <LogIn size={18} aria-hidden="true" />
                )}
                {isLoading ? 'Signing in…' : 'Sign In to Dashboard'}
              </button>
            </form>

            <p className="font-['Lato'] text-sm text-[#696664] text-center mt-8">
              &copy; {new Date().getFullYear()} American Carpet &amp; Flooring. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
