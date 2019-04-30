# Jankon Energia

## Installing 
### Installing via docker

### Installing from source

#### Frontend
Go to the frontend -folder and:
1) Install dependencies by running ```npm install````
2) Start by running ```npm start````
Backend should start into localhost:3000

#### Backend
Go to the backend -folder and:
1) Install dependencies by running ```npm install````
2) Start by running ```npm start````
Backend should start into localhost:4000

## Semi-important dev-docs

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