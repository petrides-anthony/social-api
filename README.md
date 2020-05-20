# social-web

# node-express-mongo-docker boilerplate

### src: 
- http://blog.medhat.ca/2018/03/dockerizing-node-express-api-app-with.html?m=1

## Run
To run the stack, which consists of the express server and mongo database, run the following: 

- `yarn`

- `yarn start-stack`

## Verify
Point your browser to http://localhost:3000/ and you should see three seeded users JSON objects as below:
```
[
{
"_id": "5ec4d78d5a8942b7bc1abf25",
"name": "user_1",
"email": "user_1@bogus.com"
},
{
"_id": "5ec4d78d5a894229071abf26",
"name": "user_2",
"email": "user_2@bogus.com"
},
{
"_id": "5ec4d78d5a894258101abf27",
"name": "user_3",
"email": "user_3@bogus.com"
}
]
```

## The API
The above code sets up the following API endpoints:

- `http://localhost:3000/` - Displays all documents in the users collection. If the users collection is empty then it will be seeded with three documents.
- `http://localhost:3000/add` - Adds a user document with a randomly generated name and email
- `http://localhost:3000/users/:id` - Displays a single document by MongoDB object id