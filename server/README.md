# Hydro Web Server

Hydro webserver is now running just as a prototype on http://mn2splpfa001sl0:4200/.

## Steps for building and deploying

These steps are far too complicated for now, but hopefully Jenkins and the pipeline will help in the future.

* Run `ng build`
* A dist folder should be created in the root folder
* scp the dist folder to the machine where it's being deployed. Example below:
``
scp -r /c/hydro/hydro-poc/dist constancasimas@mn2splpfa001sl0:/usr/local/bet365/hydro-web-server/
``
* Restarting the web-server now involves killing the process (`ps aux | grep main`) and running it again: `./usr/local/bet365/hydro-web-server/server/main`

We probably don't need to deploy the web-server very often, since it will just be there to serve the files in /dist, but if we want to deploy it:
* Run  GOARCH=amd64 GOOS=linux go build main.go
* Copy the resultant file to /usr/local/bet365/hydro-web-server/server/

## Changing db.json
If we want to change what is showing in the mock API we might need to create new handlers and update the db.json file in /usr/local/bet365/hydro-web-server/server. We will probably never do this.
