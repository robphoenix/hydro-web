# ![hydro](/src/assets/img/hydro_logo_blue_bg.png)

# Hydro PoC

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.5.

## Install

Clone this repo to your local machine and run `npm install` to install all dependencies. This will also install Angular & TypeScript to the local project, so you _shouldn't_ need to have them already installed globally.

## Local development server

We're currently using [json-server](https://github.com/typicode/json-server) to mock a REST API. To use this run `npm run server` within the repo, this will start the mock API running on `http://localhost:3000`.

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Load test web server

Hydro webserver is now running just as a prototype on http://mn2splpfa001sl0:4200/.

### Building and deploying

These steps are far too complicated for now, but hopefully Jenkins and the pipeline will help in the future.

* Run `ng build`
* A dist folder should be created in the root folder
* scp the dist folder to the machine where it's being deployed. Example below:

```
scp -r /c/hydro/hydro-poc/dist constancasimas@mn2splpfa001sl0:/usr/local/bet365/hydro-web-server/
```

* Restarting the web-server now involves killing the process (`ps aux | grep main`) and running it again: `./usr/local/bet365/hydro-web-server/server/main`

We probably don't need to deploy the web-server very often, since it will just be there to serve the files in /dist, but if we want to deploy it:
* Run  `GOARCH=amd64 GOOS=linux go build main.go`
* Copy the resultant file to /usr/local/bet365/hydro-web-server/server/

### Changing db.json
If we want to change what is showing in the mock API we might need to create new handlers and update the db.json file in /usr/local/bet365/hydro-web-server/server. We will probably never do this.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
