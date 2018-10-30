![hydro](/src/assets/img/hydro_logo_blue_bg.png)

# Hydro Web

<!-- TOC depthFrom:2 -->

- [Install](#install)
- [Mock JSON API Server](#mock-json-api-server)
- [Local Development](#local-development)
- [Dev server](#dev-server)
  - [Build and Deploy](#build-and-deploy)
- [Running Unit Tests](#running-unit-tests)
- [Running End-to-End Tests](#running-end-to-end-tests)
- [CSS](#css)
- [Hydro API](#hydro-api)

<!-- /TOC -->

## Install

Clone this repo to your local machine and run `npm install` to install all dependencies. This will also install Angular & TypeScript to the local project, so you _shouldn't_ need to have them already installed globally.

## Mock JSON API Server

While the API is being built we have a small mock API server, written in Go, which we use locally and on the DEV server. We're using this homegrown option temporarily as we can't have node/npm installed on the dev server, and maintaining a local [json-server](https://github.com/typicode/json-server) as well as the DEV API was a PITA. You'll find this in the `/server` directory, and will need to have Go installed to build it. If people without Go installed need it, then I'm sure we can start releasing a binary for it, we'll cross that bridge when we come to it.

To run only the API, and leave serving the app to Angular, run `go run main.go --index=false` in the `/server` directory.

## Local Development

- Run `npm run server` to start up the mock API server.
- Run `npm run start` to start up the app, and then navigate to [http://localhost:4200/](http://localhost:4200/). The app will automatically reload if you change any of the source files.

## Dev server

A dev instance of Hydro is available on [mn2splmfe001sd0](http://mn2splmfe001sd0:4200). The Angular app here is served up by the same small Go server that serves up the mock JSON API. Due to the limitations with this deep links will not work on the DEV server.

### Build and Deploy

We currently have one Jenkins build job, [Hydro-web](https://mn2forbld0001d0/job/Hydro-web/). This will build and deploy the Angular app, as well as the small Go server that will serve the app and the mock JSON API. It can be triggered by Merge Requests, pushes to open Merge Requests, merges to master branch, and manually for any available branch.

## Running Unit Tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running End-to-End Tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## CSS

We are using [Angular Material](https://material.angular.io/) components for the overall style of the site. We are also using the [Tachyons CSS Toolkit](http://tachyons.io/) for any base styling of pages, and [Flex Layout](https://github.com/angular/flex-layout) for flexbox layouts. Where possible we aim to use [SCSS](http://sass-lang.com/).

## Hydro API

For further information about the Hydro API, please see the [API documentation](https://for-git-prod.lb.local/forensic_monitoring/hydro/tree/master/hydro-api)
