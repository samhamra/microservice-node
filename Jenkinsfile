node {
    def app
    checkout scm
    stage('Build') { 
      def dockerfile = 'Dockerfile.test'
      app = docker.build("nodejs-test:${env.BUILD_ID}", "-f ${dockerfile} .") 
    }
    stage('Test') {
      app.inside { 
        sh 'npm test'
      }
    }
}
