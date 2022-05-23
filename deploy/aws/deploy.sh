aws ecr get-login-password --region eu-west-2 | docker login --username AWS --password-stdin 029929660699.dkr.ecr.eu-west-2.amazonaws.com
docker compose -f ./docker-compose.prod.yml up --build --no-start
docker push 029929660699.dkr.ecr.eu-west-2.amazonaws.com/pokemon-front
docker push 029929660699.dkr.ecr.eu-west-2.amazonaws.com/pokemon-back