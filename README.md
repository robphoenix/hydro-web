![hydro](/src/assets/img/hydro_logo_blue_bg.png)

# Hydro Web

<!-- TOC depthFrom:2 -->

- [Install](#install)
- [Local Development](#local-development)
- [Dev server](#dev-server)
  - [Building and Deploying](#building-and-deploying)
  - [Changing db.json](#changing-dbjson)
- [Running Unit Tests](#running-unit-tests)
- [Running End-to-End Tests](#running-end-to-end-tests)
- [Authentication](#authentication)
  - [Expected Behaviour](#expected-behaviour)
- [Hydro API](#hydro-api)

<!-- /TOC -->

## Install

Clone this repo to your local machine and run `npm install` to install all dependencies. This will also install Angular & TypeScript to the local project, so you _shouldn't_ need to have them already installed globally.

## Local Development

We're currently using [json-server](https://github.com/typicode/json-server) locally to mock a REST API. To use this run `npm run server` within the repo, this will start the mock API running on `http://localhost:3000`.

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Dev server

A dev instance of Hydro is available on http://mn2splpfa001sl0:4200/.

### Building and Deploying

These steps are far too complicated for now, but hopefully Jenkins and the pipeline will help in the future.

- Run `ng build`
- A dist folder should be created in the root folder
- scp the dist folder to the machine where it's being deployed. Example below:

```
scp -r /c/hydro/hydro-poc/dist constancasimas@mn2splpfa001sl0:/usr/local/bet365/hydro-web-server/
```

You may have to scp to your own home folder, then log in and raise your privilege level with `dzdo su -` to then move/copy the dist folder to the `/usr/local/bet365/hydro-web-server` location.

- Restarting the web-server now involves killing the process (`ps aux | grep main`) and running it again: `./usr/local/bet365/hydro-web-server/server/main`

We probably don't need to deploy the web-server very often, since it will just be there to serve the files in `/dist`, but if we want to deploy it:

- Run `GOARCH=amd64 GOOS=linux go build main.go`
- Copy the output to `/usr/local/bet365/hydro-web-server/server/`

### Changing db.json

If we want to change what is showing in the mock API we might need to create new handlers and update the db.json file in `/usr/local/bet365/hydro-web-server/server`. We will probably never do this.

## Running Unit Tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running End-to-End Tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Authentication

[JSON Web Tokens](https://jwt.io/) provide authentication. On successful login with the server a JWT access token is returned to the client. This token is stored in local storage and contains an expiry date & time. On receiving the access token a refresh timer is started which periodically sends an HTTP request to the server to get a new token with an updated expiration. This new token then replaces the token in local storage. To refresh the JWT access token, the current token needs to still be valid.

The token is also refreshed when the app is started, if there is still a valid access token in local storage. In this case, the refresh timer is also set in motion upon app startup.

Every API request to a protected endpoint requires a valid JWT access token.

### Expected Behaviour

- Upon successful login, a user will not be logged out of the application while it is open in the browser, unless they explicitly log out.
- If the user closes the application, without explicitly logging out, they will be logged out when the JWT access token expires.
- If the application is closed and then reopened while the JWT access token is still valid, the user will still be logged in.

## Hydro API

For further information about the Hydro API, please see the [API documentation](https://for-git-prod.lb.local/forensic_monitoring/hydro/tree/master/hydro-api)
