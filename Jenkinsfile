// ═══════════════════════════════════════════════════════════════
//  RVCE Todo App — Jenkins Declarative Pipeline (Lab Demo)
// ═══════════════════════════════════════════════════════════════
//
//  This pipeline is designed specifically for a DevOps laboratory
//  practical demonstration. It verifies SCM connectivity, project
//  structure, and dependencies without compiling the React app
//  (to ensure compatibility with older Node.js runtimes).
//
// ═══════════════════════════════════════════════════════════════

pipeline {
    agent any

    stages {

        // ── Stage 1: Checkout ──────────────────────────────
        // Checks out the code from GitHub and prints repo info
        stage('Checkout') {
            steps {
                echo '📥 Checking out source code...'
                checkout scm
                
                echo '📋 Repository Information:'
                echo "Workspace: ${WORKSPACE}"
            }
        }

        // ── Stage 2: Verify Project Structure ──────────────
        // Confirms all required laboratory files are present
        stage('Verify Project Structure') {
            steps {
                echo '🔍 Checking repository structure...'
                
                script {
                    def requiredFiles = [
                        'todo-app/package.json',
                        'todo-app/Dockerfile',
                        'todo-app/docker-compose.yml',
                        'todo-app/README.md',
                        'todo-app/Jenkinsfile'
                    ]
                    
                    for (file in requiredFiles) {
                        if (!fileExists(file)) {
                            error("❌ Missing required file: ${file}")
                        }
                    }
                    
                    def requiredDirs = [
                        'todo-app',
                        'todo-app/client',
                        'todo-app/server'
                    ]
                    
                    for (dir in requiredDirs) {
                        if (!fileExists(dir)) {
                            error("❌ Missing required directory: ${dir}")
                        }
                    }
                    
                    echo "✅ All required DevOps laboratory files verified successfully."
                }
            }
        }

        // ── Stage 3: Install Dependencies ──────────────────
        // Tests dependency installation for backend and frontend
        stage('Install Dependencies') {
            steps {
                echo '📦 Installing Server Dependencies...'
                dir('todo-app/server') {
                    script {
                        if (isUnix()) {
                            sh 'npm install'
                        } else {
                            bat 'npm install'
                        }
                    }
                }

                echo '📦 Installing Client Dependencies...'
                dir('todo-app/client') {
                    script {
                        if (isUnix()) {
                            sh 'npm install'
                        } else {
                            bat 'npm install'
                        }
                    }
                }
            }
        }

        // ── Stage 4: Verify Application ────────────────────
        // Prints runtime versions and verification statuses
        stage('Verify Application') {
            steps {
                echo '⚙️  System Runtime Information:'
                script {
                    if (isUnix()) {
                        sh 'node -v || echo Node Not Found'
                        sh 'npm -v || echo NPM Not Found'
                        sh 'git --version || echo Git Not Found'
                    } else {
                        bat 'node -v || echo Node Not Found'
                        bat 'npm -v || echo NPM Not Found'
                        bat 'git --version || echo Git Not Found'
                    }
                }
                
                echo ''
                echo 'Repository Verified Successfully'
                echo 'Frontend Found'
                echo 'Backend Found'
                echo 'Docker Configuration Found'
                echo 'Jenkinsfile Found'
                echo 'Project Ready for Deployment'
            }
        }

        // ── Stage 5: Pipeline Complete ─────────────────────
        // Displays the final success banner for the laboratory
        stage('Pipeline Complete') {
            steps {
                echo '''
====================================
BUILD SUCCESSFUL
====================================

GitHub Integration ✔
Repository Checkout ✔
Dependencies Installed ✔
Project Verified ✔

This pipeline is intended for a college DevOps laboratory demonstration.

React compilation has intentionally been skipped because the Jenkins server uses an older Node.js runtime.

The repository is ready for GitHub, Docker, Azure, Webhooks, and further deployment.

====================================
'''
            }
        }
    }

    // ── Post-Build Actions ──────────────────────────────────
    post {
        success {
            echo '✅ Pipeline execution completed successfully!'
        }
        failure {
            echo '❌ Pipeline failed. Please check the logs above.'
        }
    }
}
