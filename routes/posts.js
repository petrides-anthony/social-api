const express = require("express");
const assert = require('assert');
const { BadRequest, NotFound } = require("http-errors");
const PostModel = require("../models/post");

const router = express.Router();

// GET /
// get all posts

router.get('/', async (req, res, next) => {
  try {
    const allRootPosts = await PostModel.find({ parentId: null });
    res.json(allRootPosts);
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

// POST
// Add a comment

router.post('/:id/comment', async (req, res, next) => {
  const { user, content } = req.body || {};

  try {
    assert.ok(user !== undefined, new BadRequest('`user` is missing'));
    assert.ok(typeof user === 'string', new BadRequest('`user` needs to be of type string'));
    assert.ok(content !== undefined, new BadRequest('`content` is missing'));
    assert.ok(typeof content === 'string', new BadRequest('`content` needs to be of type string'));
    assert.ok(req.params.id.length === 24, new BadRequest(`'${req.params.id}' parentId is not a valid objectId`));

    // Grab parent post
    const parentPost = await PostModel.findById(req.params.id);

    // Check if parentPost exists before adding comment
    if (!Boolean(parentPost)) {
      throw new NotFound(`Cannot find parent post. Post with id '${req.params.id}' not found.`);
    }

    // create the post object
    const comment = new PostModel({
      user: user,
      content: content,
      parentId: req.params.id
    });

    // saved in the db
    const savedComment = await comment.save();

    // add lastComment to parent post
    parentPost.lastComment = {
      user,
      content
    };

    await parentPost.save();
  
    // return saved data from the db to the client
    res.json(savedComment);

    next();
  } catch (error) {
    console.log('Error from POST/:id/comment ->', error);
    return next(error);
  }

});

module.exports = router;

// *** To Do's ***
// - Update Get Posts to only get posts where parentId is null [ x ]
// - Add a Get Comments function [ ]
// - Add a Get All Comments for a given post function [ ]
// - Add a Like function /posts/id/like [ ] Note: Mongo comes with an increment feature for this...
// ...so you don't have to do like = likes +1
// - Update Add Comments function to only add comment if req.param.id exists for a post [x]
// - Update Add Comments function so that it updates the parent post's 'lastestComment' attribute [x]

