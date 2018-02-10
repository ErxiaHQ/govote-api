# govote-api
Simple Node.js API to help people find locations to get PVCs and Vote in the upcoming Nigeria General Elections.

## Getting Started
1. Install required dependencies - `npm install`
2. Copy `.env.example` to `.env` - `cp .env.example .env`. Remember to edit in your own credentials.
3. Run migrations with knex - `node_modules/.bin/knex migrate:latest`
4. See database - `node_modules/.bin/knex seed:run`
5. Start server - `node app.js` or `nodemon app.js`
