import { useState, useEffect, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";
import toast from "react-hot-toast";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  toggleTodoStatus,
} from "../utils/todoStorage";
import {
  Plus,
  Search,
  Filter,
  ListTodo,
  CheckCircle2,
  Clock,
  TrendingUp,
  CalendarDays,
  Target,
  Zap,
  Menu,
  X,
} from "lucide-react";
import "./Dashboard.css";

export default function Dashboard() {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState("dashboard");
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Live clock
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Load tasks
  useEffect(() => {
    if (user?.rvceId) {
      setTasks(getTodos(user.rvceId));
    }
  }, [user]);

  const refreshTasks = () => setTasks(getTodos(user.rvceId));

  // Stats
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === "Completed").length;
    const pending = total - completed;
    const progress = total === 0 ? 0 : Math.round((completed / total) * 100);
    const highPriority = tasks.filter(
      (t) => t.priority === "High" && t.status === "Pending"
    ).length;
    return { total, completed, pending, progress, highPriority };
  }, [tasks]);

  // Filtered tasks
  const filteredTasks = useMemo(() => {
    let result = [...tasks];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          (t.description && t.description.toLowerCase().includes(q))
      );
    }
    if (filter === "Pending") result = result.filter((t) => t.status === "Pending");
    if (filter === "Completed") result = result.filter((t) => t.status === "Completed");
    return result;
  }, [tasks, search, filter]);

  // Greeting
  const getGreeting = () => {
    const h = now.getHours();
    if (h < 12) return "Good Morning";
    if (h < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const firstName = user?.name?.split(" ")[0] || "";

  // CRUD handlers
  const handleAddTask = (form) => {
    addTodo(user.rvceId, form);
    refreshTasks();
    toast.success("Task created! 🎯");
  };

  const handleEditTask = (form) => {
    if (editTask) {
      updateTodo(user.rvceId, editTask.id, form);
      refreshTasks();
      toast.success("Task updated! ✏️");
      setEditTask(null);
    }
  };

  const handleDeleteTask = (id) => {
    deleteTodo(user.rvceId, id);
    refreshTasks();
    toast.success("Task deleted 🗑️");
  };

  const handleToggleStatus = (id) => {
    const updated = toggleTodoStatus(user.rvceId, id);
    refreshTasks();
    if (updated?.status === "Completed") toast.success("Task completed! 🎉");
    else toast("Task marked as pending", { icon: "↩️" });
  };

  const openEditModal = (task) => {
    setEditTask(task);
    setModalOpen(true);
  };

  const openNewModal = () => {
    setEditTask(null);
    setModalOpen(true);
  };

  const dateStr = now.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeStr = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return (
    <div className="dashboard-layout">
      {/* Mobile menu button */}
      <button
        className="mobile-menu-btn"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className={sidebarOpen ? "sidebar-wrapper open" : "sidebar-wrapper"}>
        <Sidebar activeView={activeView} setActiveView={(v) => { setActiveView(v); setSidebarOpen(false); }} />
      </div>

      <main className="main-content">
        {activeView === "dashboard" && (
          <div className="dashboard-view animate-fadeIn">
            {/* Welcome header */}
            <header className="welcome-header">
              <div className="welcome-left">
                <h1 className="welcome-title">
                  {getGreeting()}, {firstName} 👋
                </h1>
                <p className="welcome-subtitle">
                  Here's your productivity overview for today
                </p>
              </div>
              <div className="welcome-right">
                <div className="live-clock glass">
                  <CalendarDays size={16} />
                  <span className="clock-date">{dateStr}</span>
                  <span className="clock-divider">•</span>
                  <Clock size={16} />
                  <span className="clock-time">{timeStr}</span>
                </div>
              </div>
            </header>

            {/* Stats cards */}
            <div className="stats-grid stagger">
              <div className="stat-card stat-total">
                <div className="stat-icon-wrap">
                  <ListTodo size={22} />
                </div>
                <div className="stat-info">
                  <span className="stat-value">{stats.total}</span>
                  <span className="stat-label">Total Tasks</span>
                </div>
              </div>
              <div className="stat-card stat-completed">
                <div className="stat-icon-wrap">
                  <CheckCircle2 size={22} />
                </div>
                <div className="stat-info">
                  <span className="stat-value">{stats.completed}</span>
                  <span className="stat-label">Completed</span>
                </div>
              </div>
              <div className="stat-card stat-pending">
                <div className="stat-icon-wrap">
                  <Clock size={22} />
                </div>
                <div className="stat-info">
                  <span className="stat-value">{stats.pending}</span>
                  <span className="stat-label">Pending</span>
                </div>
              </div>
              <div className="stat-card stat-priority">
                <div className="stat-icon-wrap">
                  <Zap size={22} />
                </div>
                <div className="stat-info">
                  <span className="stat-value">{stats.highPriority}</span>
                  <span className="stat-label">High Priority</span>
                </div>
              </div>
            </div>

            {/* Progress section */}
            <div className="progress-section glass">
              <div className="progress-header">
                <div className="progress-title-row">
                  <Target size={20} />
                  <h3>Overall Progress</h3>
                </div>
                <span className="progress-pct">{stats.progress}%</span>
              </div>
              <div className="progress-bar-track">
                <div
                  className="progress-bar-fill"
                  style={{
                    width: `${stats.progress}%`,
                    animation: "progressFill 1s ease-out",
                  }}
                />
              </div>
              <p className="progress-detail">
                {stats.completed} of {stats.total} tasks completed
                {stats.total > 0 && stats.progress === 100 && " — All done! 🎉"}
              </p>
            </div>

            {/* Quick action */}
            <div className="quick-actions">
              <button className="quick-action-btn" onClick={() => { setActiveView("tasks"); openNewModal(); }}>
                <Plus size={18} />
                <span>Create New Task</span>
              </button>
              <button className="quick-action-btn secondary" onClick={() => setActiveView("tasks")}>
                <TrendingUp size={18} />
                <span>View All Tasks</span>
              </button>
            </div>
          </div>
        )}

        {activeView === "tasks" && (
          <div className="tasks-view animate-fadeIn">
            {/* Tasks header */}
            <header className="tasks-header">
              <div className="tasks-header-left">
                <h1 className="tasks-title">My Tasks</h1>
                <span className="tasks-count">{filteredTasks.length} tasks</span>
              </div>
              <button className="add-task-btn" onClick={openNewModal}>
                <Plus size={18} />
                <span>New Task</span>
              </button>
            </header>

            {/* Toolbar */}
            <div className="tasks-toolbar">
              <div className="search-wrapper">
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search tasks…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                  <button className="search-clear" onClick={() => setSearch("")}>
                    <X size={14} />
                  </button>
                )}
              </div>

              <div className="filter-group">
                <Filter size={14} />
                {["All", "Pending", "Completed"].map((f) => (
                  <button
                    key={f}
                    className={`filter-btn ${filter === f ? "active" : ""}`}
                    onClick={() => setFilter(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Task list */}
            <div className="tasks-list">
              {filteredTasks.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">
                    <ListTodo size={48} />
                  </div>
                  <h3>
                    {search || filter !== "All"
                      ? "No matching tasks"
                      : "No tasks yet"}
                  </h3>
                  <p>
                    {search || filter !== "All"
                      ? "Try adjusting your search or filters"
                      : "Click the button below to create your first task"}
                  </p>
                  {!search && filter === "All" && (
                    <button className="empty-cta" onClick={openNewModal}>
                      <Plus size={16} />
                      Create Task
                    </button>
                  )}
                </div>
              ) : (
                filteredTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggle={handleToggleStatus}
                    onEdit={openEditModal}
                    onDelete={handleDeleteTask}
                  />
                ))
              )}
            </div>
          </div>
        )}
      </main>

      {/* FAB */}
      {activeView === "tasks" && (
        <button className="fab" onClick={openNewModal} title="Add task">
          <Plus size={24} />
        </button>
      )}

      {/* Task modal */}
      <TaskModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditTask(null);
        }}
        onSave={editTask ? handleEditTask : handleAddTask}
        editTask={editTask}
      />
    </div>
  );
}
