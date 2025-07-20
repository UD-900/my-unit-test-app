// Jenkinsfile
// This defines a declarative Jenkins Pipeline for an Angular TypeScript project.

pipeline {
    // Agent specifies where the pipeline will run.
    // 'any' means it can run on any available agent.
    agent any

    // Tools define specific tools needed, like Node.js.
    // Ensure you have a Node.js tool configured in Jenkins Global Tool Configuration
    // with the name 'NodeJS_18' (or whatever version you are using).
    tools {
        // IMPORTANT: 'v22.16.0' here must be the EXACT name of your Node.js installation
        // as configured in Jenkins -> Manage Jenkins -> Global Tool Configuration.
        nodejs 'v22.16.0'
    }

    // Stages define a series of steps for the pipeline.
    stages {
        // Stage 1: Checkout the source code from the SCM (e.g., Git).
        stage('Checkout') {
            steps {
                script {
                    echo 'Cleaning workspace...'
                    cleanWs()
                    echo 'Cloning repository...'
                    bat 'git clone --branch main https://github.com/UD-900/my-unit-test-app.git .'
                }
            }
        }

        // Stage 2: Install Node.js dependencies.
        stage('Install Dependencies') {
            steps {
                script {
                    echo 'Installing npm dependencies...'
                    bat 'npm install'

                    // DEBUGGING STEP (can be removed once working)
                    echo 'Checking for karma-junit-reporter in node_modules...'
                    bat 'dir node_modules\\karma-junit-reporter || true'
                    echo 'Finished checking for karma-junit-reporter.'
                }
            }
        }

        // Stage 3: Run Angular unit tests using Karma and Jasmine in headless mode.
        stage('Run Unit Tests') {
            steps {
                script {
                    echo 'Running Angular unit tests (Karma/Jasmine) in headless Chrome...'
                    try {
                        // *** CRITICAL FIX: Use npx to execute ng test ***
                        // npx ensures that the locally installed ng command is found and executed.
                        bat 'npx ng test --watch=false --browsers=ChromeHeadless --reporters=junit --no-progress'
                    } catch (e) {
                        echo 'Unit tests failed. Publishing test results...'
                        // Ensure this path matches the outputDir in your karma.conf.js
                        junit 'test-results/junit-report.xml' // Keeping 'junit-report.xml' as per your initial karma.conf.js
                        throw e
                    }

                    echo 'Unit tests passed. Publishing test results...'
                    // Ensure this path matches the outputDir in your karma.conf.js
                    junit 'test-results/junit-report.xml' // Keeping 'junit-report.xml' as per your initial karma.conf.js
                }
            }
        }

        // Stage 4: Build the Angular application for production.
        stage('Build Application') {
            steps {
                script {
                    echo 'Building Angular application for production...'
                    // *** Use npx to execute ng build ***
                    bat 'npx ng build --configuration=production'
                }
            }
        }

        // Stage 5: Deploy the built application.
        stage('Deploy') {
            steps {
                script {
                    echo 'Deploying application...'
                    echo 'Deployment logic goes here.'
                }
            }
        }
    }

    // Post-build actions, regardless of pipeline success or failure.
    post {
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
        failure {
            echo 'Pipeline failed. Check logs for details.'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
    }
}
