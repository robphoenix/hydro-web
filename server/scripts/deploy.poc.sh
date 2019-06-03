# build
env GO111MODULE=on GOOS=linux GOARCH=amd64 go build -o hydro-web-server
# deploy
scp -i ~/.ssh/id_rsa ./hydro-web-server robphoenix@ir3hydpoc0010p0:/home/robphoenix
# remove artefact
rm -f ./hydro-web-server
