# Approach and Decisions

### **Overview**

In designing this API, several key decisions were made to ensure scalability, security, and usability. Below are some of the main considerations:

- **Security**: Using JWT for authentication ensures secure and scalable token management.
- **Scalability**: Knex.js was chosen as the ORM for its flexibility and ability to handle complex queries efficiently.
- **Simplicity**: Keeping the API endpoints simple and RESTful allows for easier integration and use by clients.
- **Data Integrity**: Each transaction is validated to ensure data consistency and integrity.

### **Specific Decisions**

1. **User Registration**: 
- Decided to use fullname, username, email, password and address for simplicity.
- Passwords are hashed to protect user credentials

1. Create a user Account
- Decided to use user_id for simplicity and it will generate a new random 11 account number    which is set as the account table primary id

1. **Funding Accounts**:
- Ensured immediate feedback on the new balance after funding.
- Validations are in place to prevent negative balances.

1. Transferring Funds
- Implemented thorough checks to ensure the sender has sufficient funds.

1. Withdrawing fund
- Similar to funding and transferring, withdrawals are validated to maintain account integrity.