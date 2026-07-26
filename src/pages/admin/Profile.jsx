import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';

const Profile = () => {
  const { user: authUser, loadProfile, saveProfile, savePassword } = useAuth();
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [profileUpdating, setProfileUpdating] = useState(false);
  const [pwdLoading, setPwdLoading] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      const { data } = await loadProfile();
      if (active && data) setProfile(data);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [loadProfile]);

  const [profileForm, setProfileForm] = useState({ fullName: '', email: '' });
  const [pwdForm, setPwdForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (profile.fullName !== undefined || profile.email !== undefined) {
      setProfileForm({
        fullName: profile.fullName ?? '',
        email: profile.email ?? '',
      });
    }
  }, [profile.fullName, profile.email]);

  const handleProfileSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setProfileUpdating(true);
      try {
        const { data, error } = await saveProfile(profileForm);
        if (error) {
          toast.error(error);
          return;
        }

        const updated = data ?? profileForm;
        setProfile((prev) => ({ ...prev, ...updated }));
        toast.success('Profile updated');
      } finally {
        setProfileUpdating(false);
      }
    },
    [saveProfile, profileForm],
  );

  const handlePasswordSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!pwdForm.currentPassword) {
        toast.error('Current password is required');
        return;
      }
      if (!pwdForm.newPassword) {
        toast.error('New password is required');
        return;
      }
      if (pwdForm.newPassword !== pwdForm.confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }

      setPwdLoading(true);
      try {
        const { error } = await savePassword({
          currentPassword: pwdForm.currentPassword,
          newPassword: pwdForm.newPassword,
        });

        if (error) {
          toast.error(error);
          return;
        }

        toast.success('Password updated');
        setPwdForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } finally {
        setPwdLoading(false);
      }
    },
    [savePassword, pwdForm],
  );

  const displayName = profile.fullName ?? authUser?.fullName ?? authUser?.name ?? 'Admin';
  const displayEmail = profile.email ?? authUser?.email ?? '';

  return (
    <section className="space-y-8">
      <div>
        <h1 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-2xl sm:text-3xl leading-tight">
          Profile
        </h1>
        <p className="mt-1 text-base font-['Lato'] text-[#696664]">
          Manage your account details and password.
        </p>
      </div>

      {loading && <p className="text-base font-['Lato'] text-[#696664]">Loading profile...</p>}

      {!loading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6">
            <h2 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-lg">
              Account Details
            </h2>
            <form onSubmit={handleProfileSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label
                  htmlFor="profileFullName"
                  className="text-sm font-medium font-['Lato'] text-[#0d0b0a]"
                >
                  Full Name
                </label>
                <input
                  id="profileFullName"
                  type="text"
                  value={profileForm.fullName}
                  onChange={(e) => setProfileForm((f) => ({ ...f, fullName: e.target.value }))}
                  placeholder={displayName}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-base font-['Lato'] text-[#0d0b0a] focus:outline-none focus:ring-2 focus:ring-[#0d0b0a]/20 focus:border-[#0d0b0a]"
                />
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="profileEmail"
                  className="text-sm font-medium font-['Lato'] text-[#0d0b0a]"
                >
                  Email Address
                </label>
                <input
                  id="profileEmail"
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder={displayEmail}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-base font-['Lato'] text-[#0d0b0a] focus:outline-none focus:ring-2 focus:ring-[#0d0b0a]/20 focus:border-[#0d0b0a]"
                />
              </div>
              {profile.createdAt && (
                <p className="text-sm font-['Lato'] text-[#696664]">
                  Member since {new Date(profile.createdAt).toLocaleDateString()}
                </p>
              )}
              <button
                type="submit"
                disabled={profileUpdating}
                className="px-6 py-2.5 bg-[#0d0b0a] hover:bg-[#1f1b18] text-white rounded-full text-base font-medium font-['Lato'] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {profileUpdating ? 'Saving...' : 'Update Profile'}
              </button>
            </form>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6">
            <h2 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-lg">
              Change Password
            </h2>
            <form onSubmit={handlePasswordSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label
                  htmlFor="profileCurrentPassword"
                  className="text-sm font-medium font-['Lato'] text-[#0d0b0a]"
                >
                  Current Password
                </label>
                <div className="relative">
                  <input
                    id="profileCurrentPassword"
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={pwdForm.currentPassword}
                    onChange={(e) =>
                      setPwdForm((f) => ({ ...f, currentPassword: e.target.value }))
                    }
                    placeholder="Enter current password"
                    autoComplete="current-password"
                    className="w-full px-4 py-2.5 pr-11 border border-gray-200 rounded-xl text-base font-['Lato'] text-[#0d0b0a] focus:outline-none focus:ring-2 focus:ring-[#0d0b0a]/20 focus:border-[#0d0b0a]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword((prev) => !prev)}
                    aria-label={showCurrentPassword ? 'Hide current password' : 'Show current password'}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#696664] hover:text-[#0d0b0a] transition-colors cursor-pointer"
                  >
                    {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="profileNewPassword"
                  className="text-sm font-medium font-['Lato'] text-[#0d0b0a]"
                >
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="profileNewPassword"
                    type={showNewPassword ? 'text' : 'password'}
                    value={pwdForm.newPassword}
                    onChange={(e) => setPwdForm((f) => ({ ...f, newPassword: e.target.value }))}
                    placeholder="Enter new password"
                    autoComplete="new-password"
                    className="w-full px-4 py-2.5 pr-11 border border-gray-200 rounded-xl text-base font-['Lato'] text-[#0d0b0a] focus:outline-none focus:ring-2 focus:ring-[#0d0b0a]/20 focus:border-[#0d0b0a]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    aria-label={showNewPassword ? 'Hide new password' : 'Show new password'}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#696664] hover:text-[#0d0b0a] transition-colors cursor-pointer"
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="profileConfirmPassword"
                  className="text-sm font-medium font-['Lato'] text-[#0d0b0a]"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="profileConfirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={pwdForm.confirmPassword}
                    onChange={(e) =>
                      setPwdForm((f) => ({ ...f, confirmPassword: e.target.value }))
                    }
                    placeholder="Confirm new password"
                    autoComplete="new-password"
                    className="w-full px-4 py-2.5 pr-11 border border-gray-200 rounded-xl text-base font-['Lato'] text-[#0d0b0a] focus:outline-none focus:ring-2 focus:ring-[#0d0b0a]/20 focus:border-[#0d0b0a]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#696664] hover:text-[#0d0b0a] transition-colors cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={pwdLoading}
                className="px-6 py-2.5 bg-[#0d0b0a] hover:bg-[#1f1b18] text-white rounded-full text-base font-medium font-['Lato'] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {pwdLoading ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Profile;
