# govote-api
Simple Node.js API to help people find locations to get PVCs and Vote in the upcoming Nigeria General Elections.

## Requirements
To run locally, you would need the following installed:
1. [MySQL](https://www.mysql.com/)
2. [Node.js and NPM](https://nodejs.org/en/)

## Getting Started
1. Install required dependencies - `npm install`
2. Copy `.env.example` to `.env`. Remember to edit in your own credentials - `cp .env.example .env`.
3. Run migrations with knex - `node_modules/.bin/knex migrate:latest`
4. Seed database - `node_modules/.bin/knex seed:run`
5. Start server - `node app.js` or `nodemon app.js`

## Todo
- Documentation
- Tests
- Implement [Election Candidates feature](https://twitter.com/Itz_Matti/status/960340741871595523)
- Log all searches from clients
