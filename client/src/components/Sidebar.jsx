import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import {
  LayoutDashboard,
  CheckSquare,
  LogOut,
  Sun,
  Moon,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import "./Sidebar.css";

export default function Sidebar({ activeView, setActiveView }) {
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
    : "?";

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "tasks", label: "My Tasks", icon: CheckSquare },
  ];

  return (
    <aside className="sidebar glass">
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="brand-icon">
          <Sparkles size={22} />
        </div>
        <div className="brand-text">
          <span className="brand-name gradient-text">RVCE Todo</span>
          <span className="brand-sub">CNA Lab</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeView === item.id ? "active" : ""}`}
            onClick={() => setActiveView(item.id)}
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Bottom */}
      <div className="sidebar-bottom">
        {/* Theme toggle */}
        <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
        </button>

        {/* Profile card */}
        <div className="profile-card">
          <div className="profile-avatar">{initials}</div>
          <div className="profile-info">
            <span className="profile-name">{user?.name}</span>
            <span className="profile-id">
              <GraduationCap size={12} /> {user?.rvceId}
            </span>
          </div>
          <button className="logout-btn" onClick={logout} title="Log out">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
