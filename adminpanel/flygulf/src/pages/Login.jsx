



import { useState } from "react";
import { loginUser, updatePassword } from "../apiIntegration/login.api";


const UserIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
  </svg>
);

const KeyIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
  </svg>
);

function InputField({ type, placeholder, icon, value, onChange }) {
  const [focused, setFocused] = useState(false);
  return (
    <div
      className={`relative mb-4 rounded-xl transition-all duration-300 ${
        focused
          ? "ring-2 ring-purple-400 shadow-lg shadow-purple-100"
          : "ring-1 ring-gray-200 hover:ring-purple-300 hover:shadow-md hover:shadow-purple-50"
      }`}
    >
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full rounded-xl px-4 py-3 pr-10 text-sm text-gray-600 bg-gray-50 outline-none transition-colors duration-300"
      />
      <span
        className={`absolute right-3 top-1/2 -translate-y-1/2 flex items-center transition-colors duration-300 ${
          focused ? "text-purple-500" : "text-gray-400"
        }`}
      >
        {icon}
      </span>
    </div>
  );
}

export default function Login() {
  const [isForgot, setIsForgot] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Login form state
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  // Update password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    const result = await loginUser(loginData.username, loginData.password);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        // Redirect to dashboard or home page
        window.location.href = "/dashboard";
      }, 2000);
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  const handleUpdatePassword = async () => {
    setError("");
    setLoading(true);

    const result = await updatePassword(
      passwordData.currentPassword,
      passwordData.newPassword,
      passwordData.confirmPassword
    );

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setIsForgot(false);
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      }, 2000);
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
    >
      <h1 className="text-white text-4xl font-bold mb-8 tracking-widest drop-shadow-lg">
        {isForgot ? "Reset Password" : "Login"}
      </h1>

      <div
        className="w-[820px] h-[480px] bg-white rounded-[30px] overflow-hidden"
        style={{
          boxShadow: "0 30px 80px rgba(100,60,180,0.45), 0 0 0 1.5px rgba(167,139,250,0.25)",
        }}
      >
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{
            width: "200%",
            transform: isForgot ? "translateX(-50%)" : "translateX(0%)",
          }}
        >
          {/* ── SLIDE 1: LOGIN ── */}
          <div className="flex h-full" style={{ width: "50%" }}>
            <div className="w-1/2 h-full flex flex-col justify-center px-12">
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-6 tracking-tight">
                Login
              </h2>

              <InputField
                type="text"
                placeholder="Username"
                icon={<UserIcon />}
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
              />
              <InputField
                type="password"
                placeholder="Password"
                icon={<LockIcon />}
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              />

              {error && !isForgot && (
                <div className="mb-3 text-center text-xs text-red-600 font-semibold bg-red-50 py-2 rounded-xl ring-1 ring-red-200">
                  {error}
                </div>
              )}

              {success && !isForgot && (
                <div className="mb-3 text-center text-xs text-green-600 font-semibold bg-green-50 py-2 rounded-xl ring-1 ring-green-200">
                  ✓ Login successful!
                </div>
              )}

              <p
                onClick={() => setIsForgot(true)}
                className="text-right text-xs text-gray-400 mb-5 cursor-pointer hover:text-purple-600 transition-colors duration-200 hover:underline underline-offset-2"
              >
                Forgot Password?
              </p>

              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full py-3 mt-1 rounded-xl text-white text-sm font-bold tracking-wide
                  hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-300
                  active:scale-95 transition-all duration-300 disabled:opacity-50"
                style={{ background: "linear-gradient(135deg, #a78bfa 0%, #6d28d9 100%)" }}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>

            <div
              className="w-1/2 h-full flex flex-col items-center justify-center gap-4 rounded-[30px] flex-shrink-0 relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #a78bfa 0%, #6d28d9 100%)" }}
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-5 rounded-full" />
              <div className="absolute -bottom-12 -left-8 w-52 h-52 bg-white opacity-5 rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white opacity-[0.03] rounded-full" />

              <h2 className="text-white text-2xl font-bold text-center leading-snug z-10 drop-shadow">
                Hello,<br />Welcome!
              </h2>
              <p className="text-purple-200 text-sm z-10">Sign in to continue</p>
            </div>
          </div>

          {/* ── SLIDE 2: FORGOT PASSWORD ── */}
          <div className="flex h-full" style={{ width: "50%" }}>
            <div className="w-1/2 h-full flex flex-col justify-center px-12">
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-6 tracking-tight">
                Update Password
              </h2>

              <InputField
                type="password"
                placeholder="Current Password"
                icon={<LockIcon />}
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              />
              <InputField
                type="password"
                placeholder="New Password"
                icon={<KeyIcon />}
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              />
              <InputField
                type="password"
                placeholder="Confirm Password"
                icon={<CheckIcon />}
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              />

              {error && isForgot && (
                <div className="mb-3 text-center text-xs text-red-600 font-semibold bg-red-50 py-2 rounded-xl ring-1 ring-red-200">
                  {error}
                </div>
              )}

              {success && isForgot && (
                <div className="mb-3 text-center text-xs text-green-600 font-semibold bg-green-50 py-2 rounded-xl ring-1 ring-green-200">
                  ✓ Password updated successfully!
                </div>
              )}

              <button
                onClick={handleUpdatePassword}
                disabled={loading}
                className="w-full py-3 mt-1 rounded-xl text-white text-sm font-bold tracking-wide
                  hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-300
                  active:scale-95 transition-all duration-300 disabled:opacity-50"
                style={{ background: "linear-gradient(135deg, #a78bfa 0%, #6d28d9 100%)" }}
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </div>

            <div
              className="w-1/2 h-full flex flex-col items-center justify-center gap-4 rounded-[30px] flex-shrink-0 relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #a78bfa 0%, #6d28d9 100%)" }}
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-5 rounded-full" />
              <div className="absolute -bottom-12 -left-8 w-52 h-52 bg-white opacity-5 rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white opacity-[0.03] rounded-full" />

              <h2 className="text-white text-2xl font-bold text-center leading-snug z-10 drop-shadow">
                Reset<br />Password
              </h2>
              <p className="text-purple-200 text-sm z-10 text-center px-8">
                Enter your current & new password
              </p>
              <button
                onClick={() => {
                  setIsForgot(false);
                  setSuccess(false);
                  setError("");
                  setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
                }}
                className="z-10 mt-1 border-2 border-white text-white text-sm font-bold px-9 py-2.5 rounded-full bg-transparent
                  hover:bg-white hover:text-purple-700 hover:scale-105 hover:shadow-xl
                  active:scale-95 transition-all duration-300"
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}