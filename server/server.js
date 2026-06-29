/**
 * ============================================================
 * RVCE Todo Application — Express Backend Server
 * ============================================================
 * 
 * This server handles:
 *  1. Authentication via POST /api/login
 *  2. Health check via GET /api/health
 *  3. Serving the React frontend in production mode
 * 
 * No database is used. All task data lives in the browser's
 * localStorage, keyed per student RVCE ID.
 * ============================================================
 */

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const { users, MASTER_PASSWORD } = require("./users");

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ──────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── API Routes ─────────────────────────────────────────────

/**
 * GET /api/health
 * Used to verify the server is running.
 * Called by Docker health checks, Jenkins pipelines,
 * and Azure App Service probes.
 */
app.get("/api/health", (req, res) => {
  res.json({
    status: "Running",
    application: "RVCE Todo App",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
  });
});

/**
 * POST /api/login
 * Authenticates a student using their RVCE ID and password.
 * Password is hardcoded as "1234" for all students.
 * 
 * Request body: { rvceId: string, password: string }
 * Success response: { success: true, name: string, rvceId: string }
 * Error response: { success: false, message: string }
 */
app.post("/api/login", (req, res) => {
  const { rvceId, password } = req.body;

  // Validate input
  if (!rvceId || !password) {
    return res.status(400).json({
      success: false,
      message: "RVCE ID and Password are required.",
    });
  }

  // Find user by RVCE ID (case-insensitive)
  const user = users.find(
    (u) => u.rvceId.toUpperCase() === rvceId.trim().toUpperCase()
  );

  // Check credentials
  if (!user || password !== MASTER_PASSWORD) {
    return res.status(401).json({
      success: false,
      message: "Invalid RVCE ID or Password.",
    });
  }

  // Return success with user info
  return res.json({
    success: true,
    name: user.name,
    rvceId: user.rvceId,
  });
});

// ─── Serve React Frontend (Production) ─────────────────────
// In production, the built React app (client/dist) is served
// as static files. Any route that doesn't match an API endpoint
// falls through to index.html for React Router to handle.
const clientDistPath = path.join(__dirname, "..", "client", "dist");
app.use(express.static(clientDistPath));
app.get("*", (req, res) => {
  res.sendFile(path.join(clientDistPath, "index.html"));
});

// ─── Start Server ───────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 RVCE Todo App running on http://localhost:${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
});
