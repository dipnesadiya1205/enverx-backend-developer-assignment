## _Assginment For Backend Developer Role_

### Prerequisite Tools

1. VS Code
2. NodeJS (18.13.0)
3. Typescript (5.0.4)
4. Postman
5. MongoDB

### Instructions 

#### Setup Project
``` diff
1. Clone repository into local machine
- git clone https://github.com/dipnesadiya1205/enverx-backend-developer-assignment.git

2. Go to project folder
- cd enverx-backend-developer-assignment

3. Checkout to development branch
- git checkout development

4. Install all dependencies
- npm install

5. Run project
- npm start
```

#### Database configuration

1. We are using MongoDB database. Create database on MongoDB and get connection string to connect nodejs server with mongodb atlas

example:
``` diff
- mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority
```
2. Create ```.env``` file for database configuration, server port and jwt signature
3. Replace all variables of connection string with yours through ```.env``` file
4. Variables to set in ```.env``` file.
   ``` diff
      # Environment
      ENV = "localhost"

      # Node Server Port
      NODE_PORT

      # MongoDB Configuration
      DB_HOST
      DB_USER
      DB_PASSWORD
      DB_NAME

      # JWT Secret Key
      JWT_SECRET_KEY
   ```

### Functional Implementation
1. Endpoints for User sign up, login and get details

- `GET /user/:user_id` - Get a specific user by ID.
- `POST /user` - sign up user with name, contact_no, email and password fields
- `POST /user/login` - login user with email and password
   
2. Endpoints for blog posts. 

 ``Note: All routes are private. You need to pass the JWT token to "request headers" to access it. You can get a token by logging in.``

- `GET /posts` - Get all blog posts
     * Apply sorting on all fields individually (title, content, category, creation date)
     * Apply sorting on combination of one or more fields (title, content, category, creation date)
     * Filter applied on category
     * Filter applied on title and content fields with substring search
- `GET /posts/:id` - Get a specific blog post by ID.
- `POST /posts` - Create a new blog post.
- `PUT /posts/:id` - Update an existing blog post.
- `DELETE /posts/:id` - Delete a blog post.

### Configure Postman collection to Test APIs

1. Open postman and import json which is attached to the project. (Enverx.postman_collection.json)
2. Now test apis.
