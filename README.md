# Office Transaction Management System

## Introduction

A Transaction system for an office where Account Manager will be Managing Daily Expenses for Cash Inflow / Outflow.

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (v9 or higher recommended)

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd account
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   - Create or modify `.env` file in the root directory with the following content:
   ```
   VITE_API_URL = "http://localhost:3000/api"
   ```
   - Note: Make sure your API server is running on the specified URL

4. Start the development server
   ```bash
   npm run dev
   ```

5. Build for production
   ```bash
   npm run build
   ```

6. Preview production build
   ```bash
   npm run preview
   ```

## Project Structure

```
├── public/            # Static assets
├── src/
│   ├── assets/        # Project assets (images, etc.)
│   ├── services/      # API services
│   ├── views/         # UI components and pages
│   ├── App.tsx        # Main application component
│   ├── constants.ts   # Application constants
│   └── main.tsx       # Application entry point
├── .env               # Environment variables
└── package.json       # Project dependencies and scripts
```

## Technologies Used

- **React** (v19.0.0) - Frontend library
- **TypeScript** (v5.7.2) - Type checking
- **Vite** (v6.2.0) - Build tool and development server
- **React Router** (v7.5.0) - Routing
- **Axios** (v1.8.4) - HTTP client
- **Sonner** (v2.0.3) - Toast notifications

## Features

### 1. Office Transactions Grid

Displays transactions with 5 columns: Date, Description, Credit, Debit & Running Balance. Transactions are sorted with the latest transactions at the top.

### Notes

- Running balance shows the remaining amount in the account.
- Example:
  - First entry (on 17 Feb) from the bottom in the table above is showing that 5000 have been credited to Office account so balance is 5k.
  - On 18 Feb, There was an expense of 500 on snacks party so entry should be 500 to Debit column and running balance is now 4500.
  - On 18 Feb, there is another expense of printing sheets worth 285, so running balance is 4215.
  - On 20 Feb, There are some misc. expense worth 300 so now the running balance should be 1215.

### 2. Add Transaction Page

When user clicks on "+ Add Transaction Page" it will show the "New Transaction Page".

#### Transaction type

A dropdown with one option can be selected at one time (Credit/Debit). Amount & Description are required fields.

#### On Click of Save

It will create a new transaction record in the database and redirect to Office Transactions page.

## API Integration

The application connects to a backend API with the following endpoints:

- `GET /api/transactions` - Get all transactions with running balance
- `POST /api/transactions` - Create a new transaction

See `apidocs.md` for detailed API documentation.
