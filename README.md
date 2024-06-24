# LENDSQR_Wallet App

This is a wallet application built with TypeScript, Node.js, Knex.js as the ORM, and MySQL as the database. The application allows users to create an accounts, fund their accounts, transfer funds to other users, and withdraw funds from their accounts.

## Features

1. A user can create an account.
2. A user can fund their account.
3. A user can transfer funds to another user’s account.
4. A user can withdraw funds from their account.

## Requirements

- Node.js (version 18 or later)
- MySQL UI (workbench or any one fit for you)

## Getting Started

### Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/kennykay20/LendSQR_Wallet_App
    cd LendSQR_Wallet_App
    ```

2. **Install dependencies:**

    ```
    npm install
    ```

3. **Set up an environment variables:**

    Create a `.env` file in the root directory and add your MySQL configuration:
    you can check the .env.example file as an example

    ```env
    DB_NAME='mysql2'
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=yourpassword
    DB_NAME=wallet_db
    DB_PORT=3306
    JWT_SECRET=your_jwt_secret
    ```

4. **Set up the database:**

    Make sure you have MySQL UI like workbench or server running and create the database:

    ```sql
    CREATE DATABASE wallet_db;
    ```

    Run the migrations scripts to create the necessary tables:

    ```
    npm run migrate
    ```

### Scripts

- **Migrate the database:**

    ```
    npm run migrate
    ```

- **Rollback the last migration:**

    ```
    npm run migrate:rollback
    ```
- **Build the application:**

    ```
    npm run build
    ```
- **Start and Run the application in development mode:**

    ```
    npm run start:dev
    ```
- **Start and Run the application in production mode:**

    ```
    npm run start:prod
    ``

## Project Structure

├── src
│ ├── Accounts
│ │ ├── dto
│ │ │ ├── account.interface.ts
│ │ ├── account.controller.ts
│ │ ├── accont.service.ts
│ ├── Authorization
│ │ ├── dto
│ │ ├── auth.controller.ts
│ │ ├── auth.service.ts
│ ├── configs
│ │ ├── index.ts
│ ├── database
│ │ ├── migrations
│ │ │ ├── 20240621133744_add_users_tbl.ts
│ │ │ ├── 20240621215756_add_accounts_tbl.ts
│ │ │ ├── 20240621220904_add_transactions_tbl.ts
│ │ ├── db.ts
│ ├── middlewares
│ │ ├── auth,middleware.ts
│ ├── routes
│ │ ├── account.route.ts
│ │ ├── index.route.ts
│ │ ├── transaction.route.ts
│ │ ├── users.route.ts
│ ├── Transactions
│ │ ├── dto
│ │ │ ├── transaction.interface.ts
│ │ ├── transaction.controller.ts
│ │ ├── transaction.service.ts
│ ├── Users
│ │ ├── dto
│ │ │ ├── user.interface.ts
│ │ ├── user.controller.ts
│ │ ├── user.service.ts
│ ├── utils
│ │ ├── auth.ts
│ │ ├── helpers.ts
│ │ ├── index.ts
│ ├── main.ts
├── .env
├── .env.example
├── .gitignore
├── knexfile
├── package-lock.json
├── package.json
├── Procfile
├── tsconfig.json
└── README.md


## API Endpoints


### User

- **POST /api/v1/user/register**: Register/create as a new user
- **POST /api/v1/auth/login** Login as an existing user
- **GET /api/v1/users** Get the list of all registered users
- **GET /api/v1/users/:id** Get user by id
- **PUT /api/v1/users/:id** update a user by id
- **DELETE/api/v1/users/:id** delete a user by id

### Account

- **POST /api/v1/accounts/create**: create a user account details
- **POST /api/v1/accounts/fund**: Fund your account
- **POST /api/v1/accounts/transfer**: Tranfer funds to another user account
- **POST /api/v1/accounts/withdraw**: withdraw funds from your account
- **GET /api/v1/accounts/balance/:account_id**: Check your account balance


## Example Usage

### Register a User

```sh
curl -X POST http://localhost:3400/api/v1/user/register \ 
  -H "Content-Type: application/json" \ 
  -d '{
    "full_name": "mary kay",
    "username": "marykay",
    "email": "marykay@gmail.com",
    "password": "Password1",
    "address": "lagos street"
  }'
```

### Login as an existing user

```sh
curl -X POST http://localhost:3400/api/v1/auth/login \  
  -H "Content-Type: application/json" \  
  -d '{
    "email": "marykay@gmail.com",
    "password": "Password1",
  }'
```
### after you login successfully, it will return a token(jwt_accesstoken), you will use this token as a bearer token when you want to do the necessary transactions like create an account, fund account, withdraw e.t.c, Token only last for 1hr, it expires after one hour.

### Create an account -- this will generate 11 random account number for the user which stand as a primary id for the accounts table and as well as the account number for the user

```sh
curl -X POST http://localhost:3400/api/v1/accounts/create \ 
  -H "Content-Type: application/json" \ 
  -d '{
    "user_id": "1"
  }'
```

### Fund an existing account

```sh
curl -X POST http://localhost:3400/api/v1/accounts/fund \ 
  -H "Content-Type: application/json" \ 
  -H "Authorization: Bearer your_bearer_token_here" \ 
  -d '{
    "account_id": 10947536006,
    "amount": 100,
    "remark": (optional)
  }'
```

### Transfer funds to another account
```sh
curl -X POST http://localhost:3400/api/v1/accounts/transfer \  
  -H "Content-Type: application/json" \ 
 -H "Authorization: Bearer your_bearer_token_here" \ 
 -d '{
    "account_id": 10947536006,
    "recipient_account_id": 98728172911,
    "amount": 50,
    "remark": (optional)
  }'
```

### Withdraw funds
```sh
curl -X POST http://localhost:3400/api/v1/accounts/withdraw \ 
 -H "Content-Type: application/json" \ 
 -H "Authorization: Bearer your_bearer_token_here" \ 
  -d '{
  "account_id": 10947536006,
  "amount": 20,
  "remark": (optional)
}'
```

This README file includes the following sections:

- **Project title and description**: An overview of the project.
- **Features**: A list of the main features.
- **Requirements**: Software dependencies needed to run the project.
- **Getting Started**: Instructions to set up the project, including installation, environment setup, and database migration.
- **Scripts**: Common scripts to run migrations, start the development server, and production.
- **Project Structure**: A brief overview of the project directory structure.
- **API Endpoints**: A list of available API endpoints with their descriptions.
- **Example Usage**: Examples of how to use the API endpoints using `curl`.


# Notion Documentation

- For detailed documentation, please visit our [Notion page](https://www.notion.so/LendSQR_Wallet-API-Documentation-5e8eeca0874c4544be7cd668446f63fb?pvs=4)

