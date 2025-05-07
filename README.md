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

## Stack

- Node.js/Express
- MySQL
- Stripe
- React + TailwindCSS
