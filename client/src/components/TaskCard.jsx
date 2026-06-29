import {
  Check,
  Undo2,
  Pencil,
  Trash2,
  Calendar,
  Flag,
  Clock,
} from "lucide-react";
import "./TaskCard.css";

export default function TaskCard({ task, onToggle, onEdit, onDelete }) {
  const isCompleted = task.status === "Completed";

  const priorityColors = {
    Low: "var(--success)",
    Medium: "var(--warning)",
    High: "var(--danger)",
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const isOverdue = () => {
    if (!task.dueDate || isCompleted) return false;
    return new Date(task.dueDate) < new Date(new Date().toDateString());
  };

  return (
    <div className={`task-card ${isCompleted ? "completed" : ""} ${isOverdue() ? "overdue" : ""}`}>
      {/* Priority indicator */}
      <div
        className="task-priority-bar"
        style={{ background: priorityColors[task.priority] }}
      />

      <div className="task-content">
        {/* Header */}
        <div className="task-header">
          <button
            className={`task-check ${isCompleted ? "checked" : ""}`}
            onClick={() => onToggle(task.id)}
            title={isCompleted ? "Mark as pending" : "Mark as complete"}
          >
            {isCompleted ? <Check size={14} /> : null}
          </button>
          <h3 className={`task-title ${isCompleted ? "done" : ""}`}>
            {task.title}
          </h3>
          <div className="task-actions">
            {isCompleted && (
              <button
                className="action-btn undo"
                onClick={() => onToggle(task.id)}
                title="Undo completion"
              >
                <Undo2 size={14} />
              </button>
            )}
            <button
              className="action-btn edit"
              onClick={() => onEdit(task)}
              title="Edit task"
            >
              <Pencil size={14} />
            </button>
            <button
              className="action-btn delete"
              onClick={() => onDelete(task.id)}
              title="Delete task"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        {/* Description */}
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}

        {/* Meta */}
        <div className="task-meta">
          <span className="meta-badge priority" style={{
            color: priorityColors[task.priority],
            background: `${priorityColors[task.priority]}15`,
          }}>
            <Flag size={12} />
            {task.priority}
          </span>

          {task.dueDate && (
            <span className={`meta-badge due ${isOverdue() ? "overdue-badge" : ""}`}>
              <Calendar size={12} />
              {formatDate(task.dueDate)}
            </span>
          )}

          <span className={`meta-badge status ${isCompleted ? "status-done" : "status-pending"}`}>
            {isCompleted ? (
              <>
                <Check size={12} /> Completed
              </>
            ) : (
              <>
                <Clock size={12} /> Pending
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
