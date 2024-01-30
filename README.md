# Wallet System API - Backend Service

This repository contains the implementation of a backend service for a wallet system. The system supports operations like setting up wallets, processing credit and debit transactions, fetching transactions, and retrieving wallet details.

## Database Schema

The service uses two main tables: `transactions` and `Wallet`.

### Transactions Table
```sql
CREATE TABLE `transactions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `wallet_id` bigint(20) NOT NULL,
  `type` enum('CREDIT','DEBIT') DEFAULT NULL,
  `pre_balance` DECIMAL(13, 4) NOT NULL,
  `balance` DECIMAL(13, 4) NOT NULL,
  `post_balance` DECIMAL(13, 4) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`wallet_id`) REFERENCES `Wallet`(`id`) ON DELETE CASCADE,
  KEY `wallet_id` (`wallet_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3840046 DEFAULT CHARSET=utf8mb4;
```

###  Wallet Table
```sql

CREATE TABLE `Wallet` (
  `id` BIGINT(20) AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```


### API Overview

1. Initialize Wallet (/setup)
Method: POST
Body: { "balance": Decimal, "name": String }
Response: { "id": String, "balance": Decimal, "name": String, "date": JS Date Object }
2. Credit/Debit Amount (/transact/:walletId)
Method: POST
Params: walletId
Body: { "amount": Decimal, "description": String }
Response: { "balance": Decimal, "transactionId": String, "name": String, "date": JS Date Object }
3. Fetch Transactions (/transactions?walletId={walletId}&skip={skip}&limit={limit})
Method: GET
Query: walletId, skip, limit
Response: Array of transaction objects
4. Get Wallet (/wallet/:id)
Method: GET
Response: { "id": String, "balance": Decimal, "name": String, "date": JS Date Object }




## Running Instructions

### Backend
1. Spin up the MySQL image using Docker Compose in detached mode:
``` docker-compose up -d ```

2. Install dependencies and start the server:
```
npm install
npm run start
```

### Frontend
1. Install dependencies:
``` yarn install ```

2. Build the project:
``` yarn run build ```

3. Start the development server:
``` yarn run dev ``` or start the production server: ``` yarn run start ```

### demo:

[![Watch the video](https://img.youtube.com/vi/ThuroOHfuOE/0.jpg)](https://www.youtube.com/watch?v=ThuroOHfuOE)

























