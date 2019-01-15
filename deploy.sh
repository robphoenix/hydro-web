HYDRO_DIR="/usr/local/bet365/hydro-web-server"
SERVER_DIR="/usr/local/bet365/hydro-web-server/server"
USER="middleware"
HOST="mn2formlt0001d0"

echo "====> Attempting to kill running Hydro web server..."
ssh ${USER}@${HOST} /bin/bash <<'EOT'
  kill -9 $(ps aux | grep -v grep | grep hydro-web-server | awk '{print $2}') || true
EOT

echo "====> Transferring files to DEV server..."
scp -i ~/.ssh/id_rsa -r dist ${USER}@${HOST}:${HYDRO_DIR}
scp -i ~/.ssh/id_rsa server/hydro-web-server ${USER}@${HOST}:${SERVER_DIR}
scp -i ~/.ssh/id_rsa -r server/data ${USER}@${HOST}:${SERVER_DIR}

echo "====> Attempting to start the Hydro web server..."
ssh ${USER}@${HOST} /bin/bash <<'EOT'
  cd /usr/local/bet365/hydro-web-server/server
  ./hydro-web-server &
  nohup ./hydro-web-server > /dev/null 2>&1 &
EOT
