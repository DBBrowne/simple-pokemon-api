# Simple Pokemon App

An (initially) simple backend to consume https://pokeapi.co/ , with a FE to display a searchable subset of the data hosted there.

Frontend deployed at: [pokemon.dbb.tools](https://pokemon.dbb.tools/)  
Backend deployed at: [simple-pokemon-be.herokuapp.com](https://simple-pokemon-be.herokuapp.com/api/)  

Try it at [simple-pokemon-be.herokuapp.com/api/pokemon/mew](https://simple-pokemon-be.herokuapp.com/api/pokemon/mew)

  - [Project board](https://github.com/users/DBBrowne/projects/2/views/2)

## Contents
- [Simple Pokemon App](#simple-pokemon-app)
- [Demos](#demos)
- [Usage](#usage)
    - [Deployments](#Deployments)
    - [Running Locally](#running-locally)
- [Running Tests](#running-tests)
- [Known Issues](#known-issues)

### Demos

|![Pokemon Dark](https://user-images.githubusercontent.com/72463218/169523162-61105d7a-e30e-4523-8bef-f19c769c1c73.png)|![Pokemon Light](https://user-images.githubusercontent.com/72463218/169523490-2f60713f-8278-4300-8c6c-d16cb6efa17e.png)|
|---|---|

### Usage
#### Deployments
  1. AWS - Fargate / ECS - awsvpc :
      AmazonWebServices load balancer in front of nginx reverse proxy serving client at the root, and API at /api.
        - [pokezon.dbb.tools](http://pokezon.dbb.tools/)  
>eg [pokezon.dbb.tools/api/pokemon/mewtwo](http://pokezon.dbb.tools/api/pokemon/mewtwo)
  1. Netlify/Heroku - automated builds on push-to-main:
      - Frontend deployed at: [pokemon.dbb.tools](https://pokemon.dbb.tools/)   
      - Backend deployed at: [simple-pokemon-be.herokuapp.com](https://simple-pokemon-be.herokuapp.com/api/)

#### Running Locally
 
1. #### Install Git
    - https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
1. #### Clone this repository
    - You may need to [set up a Github SSH key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)
    ```console
    git clone git@github.com:DBBrowne/simple-pokemon-app.git
    ```
1. #### Install Docker
    - [docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)
    - Install docker-compose.
        - The latest versions of docker come with docker-compose built in.  Either update your docker installation, or install docker-compose separately and modify any commands from these docs to use `docker-compose` instead of `docker compose`.
1. #### Run the app
    - From the local folder where you cloned this repo, run 
      ```console
      docker compose up
      ```
        - You will see the logs from inside the containers, so web addresses may not align exactly with how they behave from your desktop.
        - If you with to run the app in the background, use `docker compose up -d`
    - Open a web browser and visit [localhost:39160](http://localhost:39160)

<details>
  <summary>Stopping the dockerised app (click here)</summary>
  
  1. with `docker compose up`
      - press `ctrl + c` (or `cmd + c`) to stop the containers.
      - repeat the above step to close docker-compose.

  1. with `docker compose up -d`
      - run `docker stop $(docker ps -q --filter "name=simple-pokemon")`
      This may take a few seconds to complete.
</details>


1. Install Node
    - Either use [Node Version Manager](https://github.com/nvm-sh/nvm) or [webInstall](https://webinstall.dev/node/) to install Node at version 16 (and the Node Package Manager that comes with it).  
    Windows is not currently supported, however webInstall  or [WSL](https://docs.microsoft.com/en-us/windows/wsl/install) may provide a route to local .
      - NVM:
        ```console
          curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
          nvm install node
          nvm install 16
          nvm use 16
        ```
      - webInstall:
        ```console
        curl -sS https://webinstall.dev/node@16 | bash
        ```
1. Run the tests:
    1. Backend:
        ```console
        npm run --prefix server test
        ```
    2. Frontend:
        From a new terminal, run the Frontend:
        ```console
        npm run --prefix client test
        ```
1. Run the project:
    1. Backend:
        ```console
        npm run --prefix server dev
        ```

        Your console should then show
        ```console
          Up and running on { address: '::', family: 'IPv6', port: 4000 }
        ```
        and a web browser should show OK when visiting:
        `localhost:49160/api/` or either of the direct addresses `http://127.0.0.1:49160/api/` or `http://[::]:49160/api/`

        You can get pokemon information from  
        - `localhost:49160/api/pokemon/<yourQueryHere>`
        e.g.:
        - - `localhost:49160/api/pokemon/mewtwo`

    2. Frontend:
        ```console
        npm run --prefix client dev
        ```
        Visit the frontend at [localhost:3000](localhost:3000)

### Running Tests

```console
  npm run --prefix client test
  npm run --prefix server test
```
or
```console
  npm run --prefix client watch
  npm run --prefix server watch
```

### Good times
  - First test suite setup involving express / HTTP / mocks.

  - Nice, lightweight, in-memory cache.  We've not holding much data here, so no issue with a crude approach.

  - Docker + docker-compose.  Plus had some fun with the new install instructions: [Docker repo issue and comment](https://github.com/docker/docker.github.io/issues/14787#issuecomment-1132753594)

### Challenges
  - First test suite setup.
    - Jest was refusing to await the teardown command.  It remains unclear why it is now behaving as expected, and is still sometimes detecting an open handle before exiting.
    - Mocking Promises, and applying consistent mocks.  Lost lot of time debugging, only to notice that i have failed to update one mock to return a Promise.  Default place for mocking will now be in beforeAll()....
  
  - Agile discipline error 
    - I should have set the backend up to return some hardcoded data, then moved immediately to the frontend, ensuring end-to-end functionality, then moved to fetching data from the pokeApi, then cache that data.  I allowed the pokeApi's requirement that users cache requests as they make them to distract me into building that cache.
    - Should have been 30-40 minutes setting up basic BE (longer with testing, but simple tests would not have ended up in the Promise confusion that this exercise lead to), then skeleton FE, then iterate and improve.
      - https://github.com/DBBrowne/actually-simple-pokeAPI-api

### Known Issues
  - [Project board](https://github.com/users/DBBrowne/projects/2/views/2)

  - Potentially more efficient to initialise one global instance of the express server, and later database connections, then shut them down at the end of the suite, rather than new instances and shutdowns in every test file.