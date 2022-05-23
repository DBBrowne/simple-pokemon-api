docker compose -f ./docker-compose.prod.yml up --build --no-start
docker push 029929660699.dkr.ecr.eu-west-2.amazonaws.com/pokemon-front
docker push 029929660699.dkr.ecr.eu-west-2.amazonaws.com/pokemon-back