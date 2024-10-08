﻿# Node.js and MySQL Docker App with HTML Frontend

### Introduction

This repository contains the Node.js application with a MySQL database, both containerised using Docker. The application includes a backend API and a simple HTML frontend that allows users to interact with the API through a web interface. The frontend is served on the root route (/) and provides buttons to check the application status and retrieve a list of users from the database.

## Objective

The goal of this project is to provide a clear and easy-to-follow example of how to:
- Containerise a Node.js application and MySQL database using Docker.
- Serve an HTML frontend with interaction capabilities. 
- Manage environment variables for different services within Docker containers.
- Follow best practices in containerisation and deployment.

<img src="https://github.com/user-attachments/assets/dd04065d-2314-401e-ac8d-666a1b1b4146" alt="GIF" width="700" />



- [Node.js and MySQL Docker App with HTML Frontend](#nodejs-and-mysql-docker-app-with-html-frontend)
    - [Introduction](#introduction)
  - [Objective](#objective)
- [Prerequisites](#prerequisites)
  - [How it Works](#how-it-works)
    - [Serving the HTML Frontend](#serving-the-html-frontend)
    - [Button Interactions](#button-interactions)
- [Setup and Usage](#setup-and-usage)
  - [1.  Clone the repository](#1--clone-the-repository)
  - [2.  Configure Environment Variables](#2--configure-environment-variables)
  - [3.  Build and Run the Containers](#3--build-and-run-the-containers)
  - [4.  Interact with the Application](#4--interact-with-the-application)
    - [Access the HTML Frontend](#access-the-html-frontend)
    - [What Happens When the Buttons Are Pressed?](#what-happens-when-the-buttons-are-pressed)
  - [5.  Preloaded Database](#5--preloaded-database)
  - [6.  Stopping the Containers](#6--stopping-the-containers)
  - [7.  How Do Node.js and MySQL Communicate? - Shared Networking](#7--how-do-nodejs-and-mysql-communicate---shared-networking)
  - [8. Troubleshooting](#8-troubleshooting)
  - [What's expected:](#whats-expected)
    - [1. Functionality](#1-functionality)
    - [2. Containerisation best Practices](#2-containerisation-best-practices)
    - [3. Documentation](#3-documentation)


# Prerequisites

- Docker installed and running on your machine.
- Docker Compose installed on your machine.

## How it Works

### Serving the HTML Frontend

The HTML file (index.html) is served at the root route (/) of the Node.js application. When a user navigates to http://localhost, the server responds by serving this HTML file, which is a simple user interface for interacting with the backend.

![localhost-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/9dbfbdd7-9826-470a-b511-1d0aecf076a6)

### Button Interactions

**Check Status**: This button sends a GET request to the /api/status endpoint. The backend responds with a JSON object containing the status of the application (e.g., { "status": "ok" }). The response is then displayed on the webpage.

**Get Users**: This button sends a GET request to the /api/users endpoint. The backend queries the MySQL database for all users in the users table and returns the data as a JSON array. This list of users is then dynamically displayed on the webpage.


# Setup and Usage

## 1.  Clone the repository 

```sh
git clone https://github.com/zyusuf88/DevOps-Challenge-.git
cd DevOps-Challenge
```

## 2.  Configure Environment Variables

This project uses a `.env` file to manage environment variables. Create a `.env` file in the root directory of the project with the following content as an example:

```
# Node.js Application Environment Variables
DB_HOST=mysql
DB_USER=myapp_user
DB_PASSWORD=myapp_password
DB_NAME=myapp_db
PORT=3000
```
These environment variables will be used to configure the MySQL database and the Node.js application.

## 3.  Build and Run the Containers

Use Docker Compose to build and start the application and database containers:

```sh
docker-compose up --build
```

This command will pull the necessary images, build the application, and start both the Node.js app and the MySQL database.

## 4.  Interact with the Application

Once the containers are running, the application will be available on `http://localhost:80`.

### Access the HTML Frontend

Navigate to `http://localhost:80` in your browser. You should see a simple HTML page with two buttons:

- **Check Status:** Sends a request to /api/status.
- **Get Users:** Sends a request to /api/users.

![](/images/frontend.png)

### What Happens When the Buttons Are Pressed?

- **Check Status**: When the "Check Status" button is pressed, it triggers a request to the /api/status endpoint. The response is displayed on the page, indicating whether the application is running correctly.

- **Get Users**: When the "Get Users" button is pressed, it triggers a request to the /api/users endpoint. The response, which includes a list of users from the MySQL database, is displayed on the page.

## 5.  Preloaded Database

The MySQL container is preloaded with data using the `init.sql` file located in the repository. This file creates a users table and inserts some initial records.

## 6.  Stopping the Containers

To stop the running containers, use the following command:

```sh
docker-compose down
```

This command will stop and remove the containers, but note that in the testing environment, the MySQL data will persist due to the use of a mounted volume for the `init.sql file`.

> [!IMPORTANT]
> However, in a production environment, it is recommended to use use **managed database services**, such as Amazon RDS, instead of relying solely on Docker volumes for data persistence.
> This ensures that your data won't be lost if the MySQL container is taken down. 
> In cloud environments, you would typically use managed storage solutions with automated backups for **added security**.
>
For production, I'd consider using a Docker-managed volume for data persistence:

```yml
mydb:
  volumes:
    - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    - mydb-data:/var/lib/mysql
```


## 7.  How Do Node.js and MySQL Communicate? - Shared Networking

- Docker Compose automatically sets up a shared network for all defined services, enabling them to communicate. 
- In this setup, the Node.js application (web) connects to the MySQL database (mydb) using the service name `mydb` as the hostname, as configured in the `DB_HOST` environment variable:
```yml
services:
  web:
    environment:
      DB_HOST: mydb
    depends_on:
      - mydb

  mydb:
    image: mysql:8

```
This set up ensures that the Node.js application can easily connect to the MySQL database without additional network configuration.

## 8. Troubleshooting

- **Container Won't Start**: Ensure that the ports 80 and 3000 are not already in use by another application.

- **Database Connection Issues**: Ensure the environment variables in the .env file match the expected values in the Node.js application.

- **Application Not Responding**: Ensure the Node.js server is running correctly and is connected to the MySQL database.

## What's expected:

### 1. Functionality
The setup works as expected:
- **API Status Check:** The `/api/status` endpoint confirms the application is running.
- **User Retrieval:** The `/api/users` endpoint successfully retrieves and displays users from the MySQL database.
- **UI Functionality:** The web interface correctly shows users when the buttons "Fetch Users" or "Check Status & Show Users" are clicked.

### 2. Containerisation best Practices
The Docker setup follows best practices:
- **Separate Containers:** The Node.js application and MySQL database run in separate containers as defined in the `docker-compose.yml`.
- **Environment Variables:** Sensitive data is managed using environment variables in a `.env` file.
- **Optimised Dockerfile:** The Dockerfile is streamlined to ensure a small image size and quick build times.
- **Port Mapping:** The application is accessible via `http://localhost` with proper port mapping.
- **Volume Management:** Volume management is considered for potential data persistence.

### 3. Documentation
The setup is straightforward and easy to deploy:
- **Clear Instructions:** This README provides step-by-step instructions to build and run the application using Docker.
- **Simple Deployment:** `docker-compose` makes the deployment process simple with just a few commands.
- **Commented Code:** The codebase, including `Dockerfile` and `docker-compose.yml`, is well-commented for clarity.


