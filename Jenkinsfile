pipeline {
  agent any
  options {
    // Connection is configured by the Jenkins Gitlab plugin
    // Manage Jenkins -> Configure System -> Gitlab
    gitLabConnection('gitlab-fm')
    // Keep only the 2 latest builds.
    buildDiscarder(logRotator(numToKeepStr: '2'))
    // Prepend all console output generated by the Pipeline run with the time at which the line was emitted
    timestamps()
  }
  triggers {
    gitlab(triggerOnPush: true, triggerOnMergeRequest: true, branchFilterType: 'All')
  }
  post {
    always {
      // clean up our workspace
      deleteDir()
    }
    failure {
      updateGitlabCommitStatus name: 'hydro-web-pipeline', state: 'failed'
    }
    success {
      updateGitlabCommitStatus name: 'hydro-web-pipeline', state: 'success'
    }
  }
  stages {
    stage('NPM Install') {
      steps {
        sh '''
        npm config set strict-ssl false
        npm set registry https://proget/npm/Production-npm/
        npm ci
        '''
      }
    }
    stage('Checks') {
      parallel {
        stage('Format') {
          steps {
            sh 'npm run format:ci'
          }
        }
        stage('Lint') {
          steps {
            sh 'npm run lint'
          }
        }
      }
    }
    stage('Dev Build') {
      steps {
        sh 'npm run build:prod'
      }
    }
    stage('Dev Deploy') {
      steps {
        sh 'scp -i ~/.ssh/id_rsa -r dist middleware@mn2formlt0001d0:/usr/local/bet365/hydro-web-server'
      }
    }
    stage('PoC Build'){
      when{
        branch 'master'
      }
      steps {
        sh 'npm run build:poc'
      }
    }
  }
}
