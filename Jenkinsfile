
pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bat 'npx playwright test'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**, test-results/**',
                allowEmptyArchive: true
        }
    }
}
