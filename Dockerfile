# ═══════════════════════════════════════════════════════════════
#  RVCE Todo App — Production Dockerfile (Multi-Stage Build)
# ═══════════════════════════════════════════════════════════════
#
#  Usage:
#    docker build -t todo-app .
#    docker run -p 3000:3000 todo-app
#
#  This Dockerfile uses a multi-stage build:
#    Stage 1 (builder) — Installs Node, builds the React frontend
#    Stage 2 (production) — Copies built assets + server, runs Express
#
#  The final image only contains production dependencies,
#  keeping it lightweight (~150MB instead of ~800MB).
# ═══════════════════════════════════════════════════════════════


# ── Stage 1: Build the React Frontend ────────────────────────
# We use node:20-alpine for a small base image (~130MB)
FROM node:20-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Copy client package files first (for Docker layer caching)
# If package.json hasn't changed, npm install is cached
COPY client/package*.json ./client/

# Install client dependencies
RUN cd client && npm ci

# Copy the rest of the client source code
COPY client/ ./client/

# Build the React app for production
# This creates optimized static files in client/dist/
RUN cd client && npm run build


# ── Stage 2: Production Image ───────────────────────────────
# Start fresh from a clean alpine image (no build tools)
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy server package files first (Docker layer caching)
COPY server/package*.json ./server/

# Install ONLY production server dependencies (skip devDependencies)
RUN cd server && npm ci --omit=dev

# Copy server source code
COPY server/ ./server/

# Copy the built React frontend from Stage 1
# The Express server serves these files at runtime
COPY --from=builder /app/client/dist ./client/dist

# Copy environment example (can be overridden at runtime)
COPY .env.example ./server/.env

# Expose port 3000 (the application port)
EXPOSE 3000

# Set production environment
ENV NODE_ENV=production
ENV PORT=3000

# Health check — Docker/Compose use this to verify the container is alive
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --spider -q http://localhost:3000/api/health || exit 1

# Start the Express server
# The server serves both the API and the built React frontend
CMD ["node", "server/server.js"]
