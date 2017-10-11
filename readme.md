# **Backend Test**

Backent Test created with ExpressJS version ^4.16.1
NodeJS version Used 6.11.3

## Cloning the repository and Instalation

To use this REST API you need first clone the GIT Repository

```sh
git clone https://github.com/jhonnynho/backend-frontend-test.git
```

Then go to the backend folder and install the dependencies using this command 

```sh
    cd backend-test
    npm install
```

Once the dependencies are installed run the following command on the terminal

```sh
    cd backend-test
    npm start
```
If all its ok, in the terminal will appear this message **Server it's ready**

## Usage

To test this REST API you can do it through Postman or another REST client

## Routes

In all endpoints, you'll need to pass in the headers the ID of Requester User, this is to validate if the Requester User have the permissions to consult the data, e.g:
```sh
user_id: a0ece5db-cd14-4f21-812f-966633e7be86
```

All endpoints must be called with the GET method

### To get user data filtered by user id
```sh
http://localhost:3001/client
```
You'll need to pass the Client ID to retrieve any data, e.g:
```sh
http://localhost:3001/client?id=531172fe-352b-41e0-993d-f9f5d34ccb79
```

### To get user data filtered by user name
```sh
http://localhost:3001/client
```
You'll need to pass the Client Name to retrieve any data, e.g:
```sh
http://localhost:3001/client?name=Rochelle
```
### To get the list of policies linked to a user name
```sh
http://localhost:3001/policy/details
```

You'll need to pass the Client Name to retrieve any data, e.g:
```sh
http://localhost:3001/policy/details?name=Manning
```

### To get the user linked to a policy number

```sh
http://localhost:3001/policy/user
```

You'll need to pass the Policy ID to retrieve any data, e.g:
```sh
http://localhost:3001/policy/user?policy=64cceef9-3a01-49ae-a23b-3761b604800b
```
