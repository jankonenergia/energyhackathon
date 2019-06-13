# Jankon Energia

## Installing 

### Installing via docker compose

1) Install docker if you havent already (https://docs.docker.com/install/)
2) Install docker-compose (https://docs.docker.com/compose/install/)
4) clone this repo
5) Edit the mongodb username and password on the ```docker-compose.yml``` on project root
6) Run ```docker-compose up -d```
(-d starts the stack on the background. Without it, it's just a console app)

To stop, either close the running console app (if you started without -d) or type ```docker-compose down```

## Semi-important dev-docs

### GraphQL

#### deployment info

you can check the deployment info with a query
```
query {
  serverInfo {
    commitMessage
    commit
    buildNumber
  }
}

```
this returns the server server info, ex
```
{
  "data": {
    "serverInfo": {
      "commitMessage": "added missing context",
      "commit": "e95c77f265c370cbd47f97a11f6a17e2b9bf481d",
      "buildNumber": "46"
    }
  }
}
```

#### I'm getting null's and empty lists
Did you receive a null or an empty list?
Should there be data?

My quess would be, that you are missing the bearer token. See more below 

### JWT Token
jwt token for testing, use
```
eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjIiLCJmaXJzdE5hbWUiOiJLYWxlcnZvIiwibGFzdE5hbWUiOiJKYW5ra28iLCJlbWFpbCI6ImFzaWEua3Vubm9zc2FAamFua2tvLmVuZXJneSIsImNyZWF0ZWRBdCI6IjIwMTktMDQtMzBUMjE6MDE6MDcrMDA6MDAifQ.8AMQR2p1nRbmzV7O8NNHcZ0IBMes7QpqEAKyjV7jcC4
```
This resolves as:

```
      "id": "2",
      "createdAt": "2019-04-30T21:01:07+00:00",
      "firstName": "Kalervo",
      "lastName": "Jankko",
      "email": "asia.kunnossa@jankko.energy"
```

if you want to create a new token, just use ```jankonenergia``` as the secret (suprise suprise! - well at the least for now)

currently, passwore hash and JWT secret comes from the following environment variables

```PROFILE_JWT_SECRET```
```PROFILE_HASH_SECRET```

(There will be an mutation to create a new user from the graphql api)

for more info, check the backend, it displays the schema from all graphql queries.
