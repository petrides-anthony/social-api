# social-web

## Mongo DB Docker Setup
- https://medium.com/faun/managing-mongodb-on-docker-with-docker-compose-26bf8a0bbae3

Start the container:
`docker-compose up`
View the container:
`docker continer ls | grep mongo`
Log into the container:
`docker exec -it <id> bash`
Log into the db:
`mongo -u admin -p password --authenticationDatabase social-web-db`
You can now connect the application to the db using:
`mongodb://admin:password@127.0.0.1:27017/social-web-db`
