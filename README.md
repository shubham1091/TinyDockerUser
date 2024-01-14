# Full Stack User Management Application

This repository contains a full-stack application for user management. It consists of a frontend React application, a backend Node.js application with Prisma and PostgreSQL for data storage, and a Docker Compose configuration for easy deployment.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Backend](#backend)
- [Frontend](#frontend)
- [Database](#database)
- [Docker](#docker)
- [Getting Started](#getting-started)
- [Application Structure](#application-structure)
- [Usage](#usage)
- [Notes](#notes)
- [License](#license)

## Prerequisites

Ensure you have the following tools installed on your system:

- [Node.js](https://nodejs.org/) and npm
- [Docker](https://www.docker.com/products/docker-desktop/)

## Backend

### Prisma Schema (schema.prisma)

- Defines a `User` model with fields: `id` (auto-incremented integer), `name` (string), and `email` (string).
- Prisma client setup for interacting with the PostgreSQL database.

### Backend Code (index.js)

- Node.js application using Express.
- Exposes RESTful API endpoints for user CRUD operations.
- Utilizes Prisma as the database toolkit.

## Frontend

- React application for user management.
- Allows users to view, add, update, and delete user records.
- Communicates with the backend API for data operations.

## Database

### PostgreSQL Database

- Used to store user data.
- Defined in the `docker-compose.yml` file with a dedicated service named `db`.
- Database URL is configured through the `DATABASE_URL` environment variable.

## Docker

### Docker Compose Configuration (docker-compose.yml)

- Sets up containers for the frontend, backend, and database services.
- Defines necessary environment variables, volumes, and dependencies.

## Getting Started

1. Clone this repository to your local machine:

    ```bash
    git clone https://github.com/shubham1091/TinyDockerUser.git
    ```

2. Navigate to the project directory:

    ```bash
    cd your-repository
    ```

3. Follow the specific setup instructions for the [backend](#backend) and [frontend](#frontend).

4. Build and run the Docker Compose services:

    ```bash
    docker-compose up -d
    ```

5. Access the frontend application at [http://localhost:3000](http://localhost:3000).

## Application Structure

- **Backend:** Node.js application files, Prisma schema, and setup.
- **Frontend:** React application files.
- **Database:** PostgreSQL setup and configuration.
- **Docker:** Docker Compose configuration.

## Usage

- Interact with the frontend application to manage users.
- API requests from the frontend are handled by the backend.
- Database stores user records.

## Notes

- Ensure backend and frontend dependencies are installed before running.
- Adjust environment variables and configurations as needed.
- Prisma client needs to be generated in the backend before running.
  
## License

This project is licensed under the [MIT License](LICENSE).
