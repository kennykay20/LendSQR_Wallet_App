# API Endpoints

# **Create User**

- **Endpoint**: `POST /api/v1/user/register`
- **Description**: Creates a new user.
- **Headers**: `Content-Type: application/json`
- **Request Payload**:
    
    {
       "fullname": "john doe",
    
       "username": "johndoe22",
    
       "email": "johndoe22@gmail.com",
    
       "password": "Password1",
    
       "address": "lagos street
    }
    
- **Response**

   {

   }

The API endpoint `POST /api/v1/user/register` is used to create a new user. The required headers include `Content-Type: application/json`. The request payload should include the user's full name, username, email, password, and address. Security measures such as password hashing are implemented to protect user data.

# **Create Account**

- **Endpoint**: `POST /api/v1/accounts/create`
- **Description**: Creates a new user account
- **Headers**: `Authorization: Bearer <token>`, `Content-Type: application/json`
- **Request Payload**:

   {
      "user_id": "1"
   }

- **Response**
    
    {
    
    }
    

The API endpoint `POST /api/v1/accounts/create` is used to create a new user account. The required headers include `Authorization: Bearer <token>` and `Content-Type: application/json`. The request payload should include the user's ID. This endpoint is protected and requires user authentication.

# **Fund Account**

- **Endpoint**: `POST /api/v1/accounts/fund`
- **Description**: Funds a user's account.
- **Headers**: `Authorization: Bearer <token>`, `Content-Type: application/json`
- Request Payload:

  {

     "account_id": "11298712129",
     "amount": 100.0

     “remark”: (optional

  }

- Response

 {

}