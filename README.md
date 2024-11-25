# Task Management Project (Test)

## Table of Contents

- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Local Setup](#local-setup)

## Tech Stack

- Node.js
- TypeScript
- NestJS
- knex.js

## Prerequisites

Before you begin, ensure you have the following:

- **Node.js**: version 20.x or later (used v20.10.0).
- **NPM**: verion 10.x or later
- **Postgres** running instance or **Docker**

## Local Setup

To set up a local development environment, follow these steps:

1. Clone the project
2. Install dependancies using `npm`
3. If you don't have running Postgres instance create one using `Docker`, by running `docker compose up -d` command.
4. Create `.env` file
5. Run the project: `npm start` or `npm run start:dev`
6. You can access Swagger docs at `localhost:3000/api/docs` and you will be asked to enter `username` and `password`.
   - username is `admin`
   - password is whatever you provided in `.env` file
