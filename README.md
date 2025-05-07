# 💸 Wallet App

A basic wallet app with signup, login, deposit (via Stripe), and transaction tracking.

## Features

- JWT auth with cookies
- Register/login routes
- Protected dashboard route to get wallet balance
- Deposit route that adds funds via stripe
- Transactions route that returns list of deposits
- Tracks wallet balance and logs transactions to db

## 🗃 Database Schema

view diagram at https://dbdiagram.io/d/WalletApp-681a765a5b2fc4582f7d54f1
See `/backend/db/schema.sql` for the table definitions.

### DB Setup

CREATE DATABASE wallet_app;  
mysql -u root -p wallet_app < backend/db/schema.sql

## Stack

- Node.js/Express
- MySQL
- Stripe
- React + TailwindCSS

## Backend Setup

npm install

in .env  
JWT_SECRET=your_jwt_secret  
STRIPE_SECRET_KEY=your_stripe_key  
DB_USER=root  
DB_PASSWORD=your_db_password  
DB_HOST=localhost  
DB_DATABASE=wallet-app  
DB_NAME=wallet-app  
NODE_ENV=development  
DB_PORT=3306

PORT=3001

node index.js

## Frontend Setup

npm install

in .env  
REACT_APP_BASE_URL=http://localhost:3001  
REACT_APP_STRIPE_PK=your_stripe_pk

npm start

> ⚠️ Previous commits included a `.env` file. This has been removed and ignored, and the Stripe secret has been rotated to ensure security.
