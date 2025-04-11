## API Endpoints

### Transactions

#### GET /api/transactions

- Description: Get all transactions with running balance
- Response: List of transactions sorted by date (newest first) with running balance

#### GET /api/transactions/:id

- Description: Get a single transaction by ID
- Response: Single transaction object

#### POST /api/transactions

- Description: Create a new transaction
- Request Body:
  ```json
  {
    "description": "Office supplies",
    "amount": 500,
    "type": "debit",
    "date": "2023-08-15T10:30:00Z" // Optional, defaults to current date
  }
  ```
- Validation:
  - `description`: Required, 3-100 characters
  - `amount`: Required, numeric, greater than 0
  - `type`: Required, must be either "credit" or "debit"
  - `date`: Optional, must be a valid ISO 8601 date
