node {
    def app
    checkout scm
    stage('Build') { 
      app = docker.image("node:14.9.0-alpine") 
      app.inside {
          sh 'npm install'
      }
    }
      
    try {
      stage('Test') {
        app.inside { 
        sh 'npm test'
        }
      }
    } finally {
      junit 'test/reports/report.xml'
    }
    
}
