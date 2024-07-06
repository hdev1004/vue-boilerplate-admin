docker build -t hdev1004/vue-boilerplate-admin .
docker run -d --name vue-admin -p 8085:8085 hdev1004/vue-boilerplate-admin
