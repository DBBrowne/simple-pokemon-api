# Simple Pokemon App

An (initially) simple backend to consume https://pokeapi.co/ , with a FE to display a searchable subset of the data hosted there.

## Contents
- [Simple Pokemon App](#simple-pokemon-app)
- [Demos](#demos)
- [Usage](#usage)
- [Running Tests](#running-tests)
- [Known Issues](#known-issues)

### Demos

### Usage
1. Install Git
    - https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
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
1. Clone this repository
    ```console
    git clone [repo]
    ```
1. Run the tests:
    1. Backend:
        ```console
        npm run --prefix server test
        ```
        Your console should then show
        ```console
          Up and running on { address: '::', family: 'IPv6', port: 4000 }
        ```
        and a web browser should show OK when visiting:
        `localhost:4000/api/` or either of the direct addresses `http://127.0.0.1:4000/api/` or `http://[::]:4000/api/`
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
    2. Frontend:
        ```console
        npm run --prefix client dev
        ```


### Running Tests

```console
  npm run test
```
or
```console
  npm run watch
```

### Good times
  - First test suite setup involving express.

### Challenges
  - First test suite setup.
    - Jest was refusing to await the teardown command.  It remains unclear why it is now behaving as expected.
  
  - Agile discipline error 
    - I should have set the backend up to return some hardcoded data, then moved immediately to the frontend, ensuring end-to-end functionality, then moved to fetching data from the pokeApi, then cache that data.  I allowed the pokeApi's requirement that users cache requests as they make them to distract me into building that cache.

### Known Issues

  - Potentially more efficient to initialise one global instance of the express server, and later database connections, then shut them down at the end of the suite, rather than new instances and shutdowns in every test file.