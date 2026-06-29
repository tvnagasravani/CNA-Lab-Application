import { useState, useEffect } from "react";
import { X, Calendar, Flag, FileText, Type } from "lucide-react";
import "./TaskModal.css";

export default function TaskModal({ isOpen, onClose, onSave, editTask }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
  });

  useEffect(() => {
    if (editTask) {
      setForm({
        title: editTask.title,
        description: editTask.description || "",
        priority: editTask.priority || "Medium",
        dueDate: editTask.dueDate || "",
      });
    } else {
      setForm({ title: "", description: "", priority: "Medium", dueDate: "" });
    }
  }, [editTask, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSave(form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container glass animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 className="modal-title">
            {editTask ? "Edit Task" : "Create New Task"}
          </h2>
          <button className="modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">
              <Type size={14} />
              Title <span className="required">*</span>
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="What needs to be done?"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              autoFocus
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <FileText size={14} />
              Description
            </label>
            <textarea
              className="form-textarea"
              placeholder="Add some details…"
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                <Flag size={14} />
                Priority
              </label>
              <div className="priority-buttons">
                {["Low", "Medium", "High"].map((p) => (
                  <button
                    key={p}
                    type="button"
                    className={`priority-btn priority-${p.toLowerCase()} ${
                      form.priority === p ? "active" : ""
                    }`}
                    onClick={() => setForm({ ...form, priority: p })}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                <Calendar size={14} />
                Due Date
              </label>
              <input
                type="date"
                className="form-input"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-save">
              {editTask ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
