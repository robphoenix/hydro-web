```
.%%..%%..%%..%%..%%%%%...%%%%%....%%%%...........%%...%%..%%%%%%..%%%%%..
.%%..%%...%%%%...%%..%%..%%..%%..%%..%%..........%%...%%..%%......%%..%%.
.%%%%%%....%%....%%..%%..%%%%%...%%..%%..%%%%%%..%%.%.%%..%%%%....%%%%%..
.%%..%%....%%....%%..%%..%%..%%..%%..%%..........%%%%%%%..%%......%%..%%.
.%%..%%....%%....%%%%%...%%..%%...%%%%............%%.%%...%%%%%%..%%%%%..
.........................................................................
```

<!-- TOC depthFrom:2 -->

- [Install](#install)
- [Local Development](#local-development)
- [Dev server](#dev-server)
- [CI](#ci)
- [Hydro API](#hydro-api)

<!-- /TOC -->

## Install

Clone this repo to your local machine and run `npm install` to install all
dependencies. This will also install Angular & TypeScript to the local
project, so you _shouldn't_ need to have them already installed globally.

## Local Development

- Run `npm run start` to start up the app, and then navigate to
  [http://localhost:4200/](http://localhost:4200/). The app will automatically
  reload if you change any of the source files.

## Dev server

A dev instance of Hydro is available on
[mn2splmfe001sd0](http://mn2splmfe001sd0:4200). The Angular app here is
served up by the small Go server in `/server`. Due to the limitations with
this deep links will not work on the DEV server.

## CI

The [hydro-web-pipeline](https://mn2forbld0001d0/job/hydro-web-pipeline/)
Jenkins job will run formatting & linting checks. It will also build and
deploy the Angular app, as well as the small Go server that will serve the
app. It can be triggered by Merge Requests, pushes to open Merge Requests,
and manually for any available branch.

## Hydro API

For further information about the Hydro API, please see the [API documentation](https://for-git-prod.lb.local/forensic_monitoring/hydro/tree/master/hydro-console-api)
