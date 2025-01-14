pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/AzzouzOns/Devops.git'
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    script {
                        bat 'docker build -t monprojet-frontend .'
                    }
                }
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    script {
                        bat 'docker build -t monprojet-backend .'
                    }
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                script {
                    bat 'docker-compose up -d --build'
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    dir('frontend') {
                        bat 'npm install && npm test'
                    }
                    dir('backend') {
                        bat 'npm install && npm test'
                    }
                }
            }
        }

        stage('Clean Up') {
            steps {
                script {
                    // Nettoyer les conteneurs inutilisés
                    bat 'docker system prune -f'
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: '**/build/**/*', allowEmptyArchive: true
            echo 'Pipeline terminé.'
        }
        failure {
            echo 'Pipeline échoué.'
        }
        success {
            echo 'Pipeline réussi.'
        }
    }
}
