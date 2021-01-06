node {
    def app
    checkout scm
    stage('Build') { 
      app = docker.build("nodejs-test:${env.BUILD_ID}", "./test") 
    }
    stage('Test') {
      app.inside { 
        sh 'npm test'
      }
    }
}
