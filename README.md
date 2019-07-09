# Shuri-API

## Vision

N/A

---

## Code style

The style-guide is ESlint-airbnb, and it uses prettier for frommating code. To enable `VS Code + ESLint + prettier` follow the steps below:

- Text editor (VSCode)[https://code.visualstudio.com/]
- In VS Code, `Ctrl + Shift + X`
- Search and install _ESLint_
- Search and install _Prettier Code Formatter_
- Restart VS Code.

### Getting Started

### Clone the latest version of the repository

`https://gitlab.com/shuri-dev/shuri-api.git` or `git@gitlab.com:shuri-dev/shuri-api.git`

### Change directory

`cd into the project directory`

### Update the environment variables in sample.env file and rename it to '.env'

`cp sample.env ./.env`

### Install the project's dependencies with

`yarn` or `npm install`

### Make sure to have the postgres database created for the project

After setting up the database,

- Install the `Sequelize CLI` ==> `https://www.npmjs.com/package/sequelize-cli`
- Run the database migrations with the `db:migrate` command found in `package.json`

### Testing CI/CD

`yarn test` or `npm run test`

### Start the application

`yarn start` or `yarn run dev`

## API Spec

The preferred JSON object to be returned by the API should be structured as follows:
