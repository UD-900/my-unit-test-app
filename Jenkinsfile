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
        nodejs 'v22.16.0' // Replace 'NodeJS_18' with the name of your Node.js tool configuration in Jenkins
    }

    // Stages define a series of steps for the pipeline.
    stages {
        // Stage 1: Checkout the source code from the SCM (e.g., Git).
        stage('Checkout') {
            steps {
                script {
                    // Clean the workspace before checking out to ensure a fresh build.
                    // This helps prevent issues from previous builds.
                    echo 'Cleaning workspace...'
                    cleanWs()
                    echo 'Checking out source code...'
                    // Checks out the code from the configured SCM (e.g., Git repository).
                    // If your Jenkins job is configured with SCM, this step will automatically pull the code.
                    echo 'Cloning repository...'
                    // This will clone the 'main' branch into the current directory of the workspace.
                    bat 'git clone --branch main https://github.com/UD-900/my-unit-test-app.git .'
            
                    //echo 'Listing contents of workspace after clone:'
                    //bat 'dir /s' // Keep this debugging line for now
                    //echo 'Finished listing contents.'
                }
            }
        }

        // Stage 2: Install Node.js dependencies.
        stage('Install Dependencies') {
            steps {
                script {
                    echo 'Installing npm dependencies...'
                    bat 'npm install'
                }
            }
        }

        // Stage 3: Run Angular unit tests using Karma and Jasmine in headless mode.
        stage('Run Unit Tests') {
            steps {
                script {
                    echo 'Running Angular unit tests (Karma/Jasmine) in headless Chrome...'
                    try {
                        // Execute Angular tests.
                        // '--watch=false': Ensures tests run once and exit.
                        // '--browsers=ChromeHeadless': Uses the headless Chrome browser configured in karma.conf.js.
                        // '--reporters=junit': Ensures the JUnit reporter is active, even if not explicitly in karma.conf.js.
                        // The command will exit with a non-zero code if tests fail, causing the pipeline to fail.
                        bat 'ng test --watch=false --browsers=ChromeHeadless --reporters=junit'
                    } catch (e) {
                        // If tests fail, publish the JUnit report and then re-throw the exception
                        // to ensure the pipeline stage is marked as failed.
                        echo 'Unit tests failed. Publishing test results...'
                        junit 'test-results/junit-report.xml' // Path to the generated JUnit XML report
                        throw e // Re-throw to fail the stage
                    }

                    // If tests pass, publish the JUnit report.
                    echo 'Unit tests passed. Publishing test results...'
                    junit 'test-results/junit-report.xml' // Path to the generated JUnit XML report
                }
            }
        }

        // Stage 4: Build the Angular application for production.
        // This stage will only run if the 'Run Unit Tests' stage passes.
        stage('Build Application') {
            steps {
                script {
                    echo 'Building Angular application for production...'
                    // Use 'ng build --configuration=production' for Angular 9+ or 'ng build --prod' for older versions.
                    // '--base-href /your-app-path/' might be needed if deploying to a sub-path on your web server.
                    bat 'ng build --configuration=production'
                }
            }
        }

        // Stage 5: Deploy the built application.
        // This is a placeholder; you'll need to replace it with your actual deployment logic.
        stage('Deploy') {
            steps {
                script {
                    echo 'Deploying application...'
                    // Example deployment steps:
                    // - Copy build artifacts to a web server.
                    // - Deploy to S3, Azure Blob Storage, Google Cloud Storage.
                    // - Trigger a separate deployment job.
                    // sh 'scp -r dist/your-app-name/* user@your-server:/var/www/html/your-app'
                    // sh 'aws s3 sync dist/your-app-name/ s3://your-bucket-name --delete'
                    echo 'Deployment logic goes here.'
                }
            }
        }
    }

    // Post-build actions, regardless of pipeline success or failure.
    post {
        always {
            // Clean the workspace after the build is complete.
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
