# 📋 RVCE Todo App — DevOps Lab Manual

This manual contains the absolute minimal commands required to execute DevOps Experiments 1–9 (excluding 6).

---

## 🚀 Step 1: Initial Git Clone & Project Setup

Execute these commands to pull the repository and install all dependencies:

```bash
# 1. Clone the repository
git clone https://github.com/Dheeraj-02NK/CNA-Lab-Application.git

# 2. Go to the project folder
cd CNA-Lab-Application/todo-app

# 3. Setup configurations (Linux / macOS)
cp .env.example server/.env
cp .env.example client/.env

# 3. Setup configurations (Windows)
copy .env.example server\.env
copy .env.example client\.env

# 4. Install all dependencies (server + client)
npm install
```

---

## 💻 Step 2: Multi-Platform Software Installation

If Git, Node, Docker, Jenkins, or Ngrok are missing, install them using these commands:

### 1. Git
* **Linux:** `sudo apt update && sudo apt install -y git`
* **macOS:** `brew install git`
* **Windows:** `winget install --id Git.Git -e --source winget`

### 2. Node.js (v20 LTS) & npm
* **Linux:** `curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt install -y nodejs`
* **macOS:** `brew install node@20 && brew link node@20`
* **Windows:** `winget install -e --id OpenJS.NodeJS.LTS`

### 3. Docker & Docker Compose
* **Linux:**
  ```bash
  sudo apt update && sudo apt install -y ca-certificates curl gnupg lsb-release
  sudo mkdir -p /etc/apt/keyrings
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
  sudo apt update && sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
  sudo systemctl enable docker && sudo systemctl start docker
  ```
* **macOS:** `brew install --cask docker`
* **Windows:** `winget install -e --id Docker.DockerDesktop`

### 4. Jenkins
* **Linux:**
  ```bash
  sudo apt update && sudo apt install -y openjdk-21-jre openjdk-21-jdk
  sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 5BA31D57EF5975CA 7198F4B714ABFC68
  echo "deb https://pkg.jenkins.io/debian-stable binary/" | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null
  sudo apt update && sudo apt install -y jenkins
  sudo systemctl enable jenkins && sudo systemctl start jenkins
  ```
* **macOS:** `brew install jenkins-lts && brew services start jenkins-lts`
* **Windows:** `winget install -e --id Jenkins.Jenkins`

### 5. Ngrok
* **Linux:**
  ```bash
  curl -s https://ngrok-agent.s3.amazonaws.com/files/gated/g3-luc/ngrok.asc | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null
  echo "deb https://ngrok-agent.s3.amazonaws.com/files/gated/g3-luc/ default main" | sudo tee /etc/apt/sources.list.d/ngrok.list
  sudo apt update && sudo apt install ngrok
  ```
* **macOS:** `brew install ngrok/ngrok/ngrok`
* **Windows:** `winget install -e --id ngrok.ngrok`

---

## ⚙️ Step 3: Run Jenkins & Todo App via Docker Compose

Start both services simultaneously:
```bash
# Launch services in background
docker compose up -d
```
* **Todo App URL:** http://localhost:3000
* **Jenkins GUI URL:** http://localhost:8080

**To unlock Jenkins:**
1. Fetch admin password: `docker logs jenkins-lab`
2. Open http://localhost:8080, paste password, and click **Install suggested plugins**.

**To stop services:**
```bash
docker compose down
```

---

## 🧪 Step 4: DevOps Experiments Manual

### Experiment 1: Version Control with Git
*(Delete cloned `.git` to practice initialization from scratch)*
```bash
# 1. Clear cloned Git metadata (Linux / macOS)
rm -rf .git

# 1. Clear cloned Git metadata (Windows)
rmdir /s /q .git

# 2. Initialize new Git repository
git init

# 3. Setup local name and email
git config --local user.name "Your Name"
git config --local user.email "Your Email"

# 4. Stage and commit files
git add .
git commit -m "feat: initial commit"

# 5. View git logs
git log --oneline
```

---

### Experiment 2: Collaborative Development with GitHub
```bash
# 1. Rename default branch
git branch -M main

# 2. Map local repository to your remote GitHub profile
git remote add origin https://github.com/<your-github-username>/CNA-Lab-Application.git

# 3. Push code upstream
git push -u origin main

# 4. Pull updates
git pull origin main
```

---

### Experiment 3: Containerization with Docker & Docker Compose
```bash
# 1. Build Docker image
docker build -t rvce-todo-app:1.0.0 .

# 2. Run container in background on port 3000
docker run -d -p 3000:3000 --name todo-container rvce-todo-app:1.0.0

# 3. Stop and delete container
docker stop todo-container
docker rm todo-container

# 4. Run using Docker Compose
docker compose up -d

# 5. Stop Compose environment
docker compose down
```

---

### Experiment 4: CI/CD Pipeline Automation with Jenkins

**Procedure**
1. Open Jenkins: `http://localhost:8080`
2. Click **New Item**.
3. Enter a project name (Example: `CNA Lab Apps`).
4. Select **Pipeline**.
5. Under Pipeline configuration:
   - Definition → **Pipeline script from SCM**
   - SCM → **Git**
   - Repository URL → `https://github.com/Dheeraj-02NK/CNA-Lab-Application.git`
   - Branch → `*/main`
   - Script Path → `todo-app/Jenkinsfile`
6. Click **Save**.
7. Click **Build Now**.
8. Open **Console Output** to verify the laboratory demonstration pipeline.

---

### Experiment 5: Cloud Deployment on Azure App Service

**Procedure**
1. Open the [Azure Dashboard](https://portal.azure.com).
2. Create a new Virtual Machine (VM) to demonstrate cloud infrastructure provisioning.
3. Wait for the VM allocation to complete.
4. Delete the Virtual Machine (VM) to avoid unnecessary billing and demonstrate resource de-allocation.

---

### Experiment 6: (Intentionally Omitted)
*Assessment evaluation test stage. Omitted.*

---

### Experiment 7: DevOps Foundational Lifecycle & Workflow
*(Manual execution of stages)*
```bash
# 1. Clean workspace (Linux / macOS)
rm -rf node_modules client/node_modules server/node_modules client/dist

# 1. Clean workspace (Windows)
rmdir /s /q node_modules client\node_modules server\node_modules client\dist

# 2. Code phase: Install dependencies
npm run install:all

# 3. Build phase: Compile React project
npm run build

# 4. Release & Operate phase: Start server
npm start
```

---

### Experiment 8: DevSecOps (Dependency Scanning)
```bash
# Scan Express server packages
cd server
npm audit

# Scan React client packages
cd ../client
npm audit
```

---

### Experiment 9: GitHub Webhooks

**Procedure**

**Step 1**
1. Open [Svix Play](https://play.svix.com/).
2. Generate a new webhook endpoint.
3. Copy the generated Webhook URL.
   *Example:* `https://play.svix.com/in/e_xxxxxxxxxxxxxxxxxxxxxxxxx`
   *(Use your own generated URL)*

**Step 2**
1. Open your GitHub repository.
2. Navigate to: `Settings` → `Webhooks` → `Add Webhook`

**Step 3**
Configure the webhook:
* **Payload URL:** `<Paste your Svix Play Webhook URL>`
* **Content Type:** `application/json`
* **Secret:** *(Leave Empty)*
* **SSL Verification:** `Enable SSL Verification`
* **Events:** `Just the push event`
* Click **Add Webhook**.

**Step 4**
Make a small change to your repository.
```bash
git add .
git commit -m "Webhook Test"
git push origin main
```

**Step 5**
1. Return to Svix Play.
2. Refresh the page.
3. Observe the incoming webhook request to verify that GitHub has delivered the Push event successfully.

---

## 🔌 API Specifications

### Health Check
`GET /api/health`
```json
{
  "status": "Running",
  "application": "RVCE Todo App",
  "version": "1.0.0"
}
```

### Authentication
`POST /api/login` (Body: `{"rvceId": "RVCE25MIT015", "password": "1234"}`)
```json
{
  "success": true,
  "name": "DHEERAJ N KASHYAP",
  "rvceId": "RVCE25MIT015"
}
```
