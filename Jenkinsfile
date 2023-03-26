pipeline {
  agent any
  stages {
    stage('Checkout Source') {
      steps {
        git(branch: 'staging', url: 'https://github.com/page-cloud/node-app-with-docker-jenkins.git')
      }
    }

    stage('Build image') {
      steps {
        script {
          dockerImage = docker.build dockerimagename
        }

      }
    }

    stage('Pushing Image') {
      environment {
        registryCredential = 'docker-test'
      }
      steps {
        script {
          docker.withRegistry( 'https://registry.hub.docker.com', registryCredential ) {
            dockerImage.push("latest")
          }
        }

      }
    }

    stage('Deploying App to Kubernetes') {
      steps {
        script {
          kubernetesDeploy configs: "deploymentservice.yml", kubeconfigId: "kubernetes"
        }

      }
    }

    stage('Alert') {
      steps {
        sh 'echo "Alerting"'
      }
    }

  }
  environment {
    dockerimagename = 'mdrajibkhan/nodeapp:v1'
    dockerImage = ''
  }
}