import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { loginUser } from "../utils/api";
import toast from "react-hot-toast";
import {
  GraduationCap,
  Lock,
  LogIn,
  Eye,
  EyeOff,
  Sun,
  Moon,
  Sparkles,
  ArrowRight,
  Loader2,
} from "lucide-react";
import "./Login.css";

export default function Login() {
  const [rvceId, setRvceId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!rvceId.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const data = await loginUser(rvceId, password);
      if (data.success) {
        toast.success(`Welcome, ${data.name}! 🎉`);
        login({ name: data.name, rvceId: data.rvceId });
        setTimeout(() => navigate("/dashboard"), 400);
      }
    } catch (err) {
      const msg =
        err.response?.data?.message || "Unable to connect to server.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Animated background */}
      <div className="login-bg">
        <div className="bg-orb orb-1"></div>
        <div className="bg-orb orb-2"></div>
        <div className="bg-orb orb-3"></div>
        <div className="bg-grid"></div>
      </div>

      {/* Theme toggle */}
      <button className="login-theme-toggle" onClick={toggleTheme}>
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      <div className="login-container animate-fadeInUp">
        {/* Left: branding */}
        <div className="login-branding">
          <div className="branding-content">
            <div className="branding-icon">
              <Sparkles size={32} />
            </div>
            <h1 className="branding-title">
              RVCE<span className="highlight"> Todo</span>
            </h1>
            <p className="branding-tagline">
              A modern task management system built for CNA Lab demonstrations
            </p>
            <div className="branding-features">
              <div className="feature-item">
                <div className="feature-dot"></div>
                <span>Premium Dashboard</span>
              </div>
              <div className="feature-item">
                <div className="feature-dot"></div>
                <span>Smart Task Management</span>
              </div>
              <div className="feature-item">
                <div className="feature-dot"></div>
                <span>Dark Mode Support</span>
              </div>
              <div className="feature-item">
                <div className="feature-dot"></div>
                <span>DevOps Ready</span>
              </div>
            </div>
          </div>
          <p className="branding-footer">
            RV College of Engineering © 2025
          </p>
        </div>

        {/* Right: form */}
        <div className="login-form-section">
          <div className="form-header">
            <h2 className="form-title">Welcome back</h2>
            <p className="form-subtitle">Sign in with your RVCE credentials</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="error-banner animate-fadeIn">
                <span>{error}</span>
              </div>
            )}

            <div className="input-group">
              <label className="input-label">
                <GraduationCap size={14} />
                RVCE ID
              </label>
              <div className="input-wrapper">
                <GraduationCap size={18} className="input-icon" />
                <input
                  type="text"
                  placeholder="RVCE25MIT015"
                  value={rvceId}
                  onChange={(e) => setRvceId(e.target.value.toUpperCase())}
                  className="login-input"
                  disabled={loading}
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">
                <Lock size={14} />
                Password
              </label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="login-input"
                  disabled={loading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={`login-submit ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="spin-icon" />
                  Signing in…
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p className="login-hint">
            Use your RVCE ID and password <strong>1234</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
