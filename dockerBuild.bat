set IMAGE_NAME=hdev1004/vue-boilerplate-admin
set CONTAINER_NAME=vue-admin

echo Stopping and removing any running containers named %CONTAINER_NAME%...
docker stop %CONTAINER_NAME%
docker rm %CONTAINER_NAME%

echo Removing the image named %IMAGE_NAME%...
docker rmi %IMAGE_NAME%

echo Building the new image named %IMAGE_NAME%...
docker build -t %IMAGE_NAME% .

docker run -d --name %CONTAINER_NAME% -p 8085:8085 %IMAGE_NAME%
