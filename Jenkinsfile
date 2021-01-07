node {
    def app
    checkout scm
    stage('Build') { 
      def dockerfile = 'Dockerfile.test'
      app = docker.build("nodejs-test:${env.BUILD_ID}", "-f ${dockerfile} .") 
    }
      
    try {
      stage('Test') {
        app.inside { 
          sh 'cd /service && npm test'
        }
      }
    } finally {
      sh 'ls && pwd'
    }
    
}
