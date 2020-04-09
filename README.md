# Fenix

## Features

### User side

- User registration
- User Login with email and password
- Creating scripts
- Run Scripts
- Save output

### Admin Interface

- Create User
- Edit user
- View Scripts created by users
- View output of scripts

# How to setup the project

## Full stack setup

- Run

```
git clone https://github.com/kimbugp/fenix.git && cd fenix
```

- Copy the `.env.example` rename it to `.env` and update the environment variables accordingly
- Run

```
bash start.sh
```

Go to the url
`http://localhost:3000`


## Separate set-up

- Run

```
git clone https://github.com/kimbugp/fenix.git && cd fenix && npm install

```
- Copy the `.env.example` rename it to `.env` and update the environment variables accordingly

### Starting the backend

- start the terminal and change directory to backend with `cd backend`
- Run

```
npm install && npm start
```

### Starting the frontend

- start the terminal in the repo root and run the following

```
npm start
```

Go to the url
`http://localhost:8080`

- To login in as admin use the variable in the backend `.env` file

```
ADMIN_NAME
ADMIN_PASSWORD
ADMIN_EMAIL
```

- To login in as admin use the variable in the backend .env file

```
ADMIN_NAME
ADMIN_PASSWORD
ADMIN_EMAIL
```

## Demo deployment

- `https://fenixscript.herokuapp.com/`
