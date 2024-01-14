# JWT Authentication

## Project Setup

- Initialize npm with default settings: npm init -y
- Install required libraries
  - npm i express jsonwebtoken dotenv
    - express is a framework that runs within a Node.js environment to simplify the process of building web applications and APIs
    - jswonwebtoken library helps in doing the token-based authentication
    - dotenv library helps in reading environment variables from e.nv files
  - npm i nodemon (automatically restarts server upon code changes - personal preference)

## Project structure

- middleware: contains auth.js which contains the middleware function to authenticate API requests
- server.js: code required for the entire task, general naming convention "index.js / server.js"

## Code Explained

### server.js

#### Importing libraries

```javascript
require("dotenv").config();
const express = require("express");

const app = express();
```

#### Middleware for JSON Parsing

```javascript
app.use(express.json());
```

#### Sample Data

```javascript
const products = [
  {
    name: "keyboard",
    price: "$20",
    username: "benson",
  },
  {
    name: "laptop",
    price: "$1500",
    username: "thomas",
  },
];
```

#### Routes

```javascript
// Protected route: requires authentication
app.get("/products_auth", authenticateJWT, (req, res) => {
  res.json(products.filter((product) => product.username === req.user.name));
});

// Public route: no authentication required
app.get("/products", (req, res) => {
  res.json(products);
});

// User Login
app.post("/login", (req, res) => {
  const username = req.body.username;

  const user = { name: username };

  const token = jwt.sign(user, process.env.ACCESS_SECRET);
  res.json({ message: "Logged in successfully", token });
});
```

#### Starting the Server

```javascript
app.listen(3000); // Listens to requests on port 3000.
```

### middleware/auth.js

#### Importing Required Modules

```javascript
require("dotenv").config();
const jwt = require("jsonwebtoken");
```

- `dotenv`: Loads environment variables from a `.env` file into `process.env`.
- `jsonwebtoken`: Provides functions to handle JSON Web Tokens.

#### The `authenticateJWT` Middleware Function

```javascript
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_SECRET, (err, user) => {
      if (err) {
        console.log(err);
        return res.sendStatus(403); // Token exists but is invalid
      }

      req.user = user;
      next();
    });
  } else {
    return res.sendStatus(401); // No token in the request header
  }
};
```

- The middleware checks the `Authorization` header for a JWT.
- If a token is present, it uses `jwt.verify` to validate the token.
- If the token is valid, it attaches the decoded user information to the `req` object and calls `next()` to pass control to the next middleware or route handler.
- If the token is invalid or absent, it sends an appropriate HTTP status code (403 or 401).

#### Exporting the Middleware

```javascript
module.exports = {
  authenticateJWT,
};
```

The middleware function is exported for use in other parts of the application.

#### Usage

Attach this middleware to any route that requires JWT authentication. Only requests with valid JWTs in their `Authorization` header will be allowed through.

---
