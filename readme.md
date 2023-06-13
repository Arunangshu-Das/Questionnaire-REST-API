# Questionnaire REST API

This is a RESTful API built using Node.js that provides endpoints for user authentication, managing user information, and handling a questionnaire system. The API is designed to follow best coding practices and techniques.

## Setup and Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Arunangshu-Das/Questionnaire-REST-API.git
   ```

2. Navigate to the project directory:

   ```bash
   cd mini_project
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Set up the environment variables:
   - Create a `.env` file in the root directory.
   - Define the following environment variables in the `.env` file:

     ```plaintext
     PORT=<port_number>
     JWT_SECRET=<jwt_secret_key>
     MONGODB_URI=<mongodb_uri>
     ```

     Replace `<port_number>` with the desired port number for the server to run on (e.g., 3000).
     Replace `<jwt_secret_key>` with a secret key used for JSON Web Token (JWT) generation.
     Replace `<mongodb_uri>` with the connection URI for your MongoDB database.

5. Start the server:

   ```bash
   npm start
   ```

   The server will start running on the specified port.

## Endpoints

### Welcome

- **Endpoint:** [GET] /api/welcome
- **Description:** A simple request response endpoint to check if the API is successfully called.
- **Success Response:**
  - Status code: 200
  - Content:
    ```json
    {
      "success": true,
      "message": "API successfully called"
    }
    ```

### Sign Up

- **Endpoint:** [POST] /api/signup
- **Description:** Allows a user to sign up by providing their name, email, password, and optional phone number.
- **Request Body:**
  ```json
  {
    "name": "Gaurav Kumar Verma",
    "email": "1905530@kiit.ac.in",
    "password": "example@123",
    "phone_number": "+917735709660"
  }
  ```
- **Success Response:**
  - Status code: 200
  - Content:
    ```json
    {
      "success": true,
      "message": "Signed up successfully"
    }
    ```

### Login

- **Endpoint:** [POST] /api/login
- **Description:** Allows a user to log in by providing their email and password. It returns an authorization token (JWT) that should be used for subsequent authenticated requests.
- **Request Body:**
  ```json
  {
    "email": "1905530@kiit.ac.in",
    "password": "example@123"
  }
  ```
- **Success Response:**
  - Status code: 200
  - Content:
    ```json
    {
      "success": true,
      "message": "Logged in successfully",
      "authToken": "<jwt_token>"
    }
    ```

### Edit Phone Number

- **Endpoint:** [PUT] /api/edit/phonenumber
- **Description:** Allows a user to edit or add their phone number. This endpoint requires authentication, so the request should include the authorization token in the request headers.
- **Request Body:**
  ```json
  {
    "phone_number": "+917735709660"
  }
  ```
- **Success Response:**
  - Status code: 200
  - Content:
    ```json
    {
      "success": true,
      "message": "Phone number changed / added successfully"
    }
    ```

### Submit Test

- **Endpoint:** [POST] /submit-test
-

 **Description:** Handles user responses for a selected test, stores the answers, calculates the score, and returns the score to the user.
- **Request Body:**
  ```json
  {
    "user_id": "<user_id>",
    "test_id": "<test_id>",
    "responses": [
      {
        "question_id": "<question_id_1>",
        "answers": ["<answer_id_1>", "<answer_id_2>", "..."]
      },
      {
        "question_id": "<question_id_2>",
        "answers": ["<answer_id_1>", "..."]
      },
      ...
    ]
  }
  ```
  - Replace `<user_id>` with the unique identifier of the user taking the test.
  - Replace `<test_id>` with the unique identifier of the selected test.
  - Replace `<question_id_1>`, `<question_id_2>`, etc., with the unique identifiers of the questions.
  - Replace `<answer_id_1>`, `<answer_id_2>`, etc., with the unique identifiers of the selected answer choices.
- **Success Response:**
  - Status code: 200
  - Content:
    ```json
    {
      "user_id": "<user_id>",
      "test_id": "<test_id>",
      "score": <score>
    }
    ```
    - `<score>` represents the calculated score obtained by the user.

## Database

The API uses a MongoDB database to store user information and test details. The connection to the database is established using the `MONGODB_URI` environment variable specified in the `.env` file.

## Authentication

The API uses JSON Web Tokens (JWT) for authentication. Upon successful login, a token is generated and returned to the user, which should be included in the headers of subsequent authenticated requests as follows:

```
Authorization: Bearer <jwt_token>
```

Replace `<jwt_token>` with the token obtained during login.

## Additional Information

- The API follows best practices for error handling and returns appropriate error responses when necessary.
- The user's password is securely encrypted using bcrypt before storing it in the database.
- The API enforces that a user can only take a test once.
- The test and question details are not explicitly mentioned in the code. They should be hardcoded in the database and can be managed through a separate mechanism.
- The test-related functionality is implemented in the `testController.js` file, which is included as a middleware in the main application.

Feel free to reach out if you have any further questions or need additional assistance!