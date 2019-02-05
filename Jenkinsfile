pipeline {
    agent { label 'LinuxSlave' }
    stages {
        stage ('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Test'){
            steps {
                sh 'npm install'
                sh 'npm run test'
                junit 'newman.xml'
            }
        }
    }
}