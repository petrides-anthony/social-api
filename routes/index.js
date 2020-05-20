var express = require("express");
var mongoClient = require("../mongo-client");

var usersCollection = mongoClient.collection('users');

var router = express.Router();

router.get('/', (req, res, next) => {
    usersCollection.count({},(err, docCount) => {
        if (docCount == 0) {
            const users = [
                {"name":"user_1","email":"user_1@bogus.com"},
                {"name":"user_2","email":"user_2@bogus.com"},
                {"name":"user_3","email":"user_3@bogus.com"}            
            ];
        
            // use the Event model to insert/save
            usersCollection.save(users, (err, data) => {
                if (err) {
                    res.send(err);
                }
            })
    
        }
    })

    usersCollection.find( (err, data) => {
        if (err)
            res.send(err);
        
        res.json(data);
    })

});

router.get('/add', (req, res, next) => {
    var name = 'user_'+ Math.floor(Math.random() * 1000);
    var email = name + '@bogus.com';

    var doc = {'name': name, 'email': email};
    usersCollection.save(doc, (err, data) => {
        if (err) {
            res.send(err);
        }
        res.json(data);
    })
});

// get single user
router.get("/users/:id", (req, res, next) => {
    usersCollection.findOne({_id: mongojs.ObjectId(req.params.id)},function(err, data){
        if (err) {
            res.send(err);
        }
        res.json(data);
    });
});

module.exports = router;