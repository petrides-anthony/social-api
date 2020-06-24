const express = require("express");
const assert = require('assert');
const { BadRequest, NotFound } = require("http-errors");
const PostModel = require("../models/post");

const router = express.Router();

// GET /
// get all posts

router.get('/', async (req, res, next) => {
  try {
    const allPosts = await PostModel.find();
    res.json(allPosts);
    next();
  } catch (error) {
    console.log('Error from GET all posts ->', error)
    next(error)
  }
});

// POST /
// add a new post
router.post('/', async (req, res, next) => {
  const { user, content } = req.body || {};
  
  try {
    assert.ok(user !== undefined, new BadRequest('`user` is missing'));
    assert.ok(typeof user === 'string', new BadRequest('`user` needs to be of type string'));
    assert.ok(content !== undefined, new BadRequest('`content` is missing'));
    assert.ok(typeof content === 'string', new BadRequest('`content` needs to be of type string'));
  
    // create the post object
    const post = new PostModel({
      user:  user,
      content: content
    });
  
    // saved in the db
    const savedPost = await post.save();
  
    // return saved data from the db to the client
    res.json(savedPost);
  
    next();
  } catch (error) {
    console.log('Error from POST /:id ->', error);
    return next(error);
  }

});

// GET /:id
// get a post by its id
router.get('/:id', async (req, res, next) => {
  try {
    assert.ok(req.params.id.length === 24, new BadRequest('Invalid ObjectId'));

    const post = await PostModel.findById(req.params.id);
    if (post === null) {
      throw new NotFound(`Post not found for id '${req.params.id}'`);
    }

    res.json(post);
  } catch (error) {
    console.log('my error: ', error.name);
    if (error.name === 'CastError') {
      return next(new BadRequest('Invalid ObjectId'));
    }

    next(error);
  }
});

/*
TRY
  |
  |
  | findById
  |
CATCH
  |
*/
// Run the above get posts/id and retrieve the json with that id using Mongooses findById method per below
// Return the object, or 404 from express
// https://mongoosejs.com/docs/api.html#model_Model.findById

module.exports = router;
