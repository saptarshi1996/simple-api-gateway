docker rmi $(docker images -f "dangling=true" -q) --force
docker build -t saptarshisg96/simple-api-gateway .
docker run -p 9091:9091 -d saptarshisg96/simple-api-gateway