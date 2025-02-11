# seaber2

Seaber.io test assignment

## Assignment:

Create a backend using TypeScript and a PostgreSQL database with one table named "log".

The exposed backend API must enable the insertion and listing of data.

The log table must have:

an "id" column as the primary key

an "inserted_at" column of type "timestamptz" with the default value: "now()"

a "json" column of type "json"

All columns must have the "NOT NULL" constraint.

Create a CI/CD pipeline to test the backend.

We expect that this assignment takes about 1-3 hrs to complete. Feel free to use any tools/environment you wish or are comfortable with to accomplish the task.

## Requements

- Docker

- NodeJS

## Get started

1) Install npm packages: ``npm i``

2) Create ``.env`` file from ``example.env`` and fill environment variables

3) Run docker compose ``docker-compose up -d``

4) Migrate databases structure ``npx drizzle-kit generate``

5) Run server ``npm run start`` 🚀

## Database studio

``npx drizzle-kit studio``

## API

``GET /logs`` - Get list of log items

``POST /logs`` - Add new item to log

Body payload: JSON object
