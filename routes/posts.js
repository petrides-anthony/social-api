const express = require("express");
const assert = require('assert');
const { BadRequest } = require("http-errors");
const PostModel = require("../models/post");

const router = express.Router();

router.get('/', async (req, res, next) => {
  const allPosts = await PostModel.find();
  res.json(allPosts);
  next();
});

router.get('/:id', (req, res) => {
  res.json({ text: `post id = ${req.params.id}` });
});

// POST /
// add a new post
router.post('/', async (req, res, next) => {
  const { user, content } = req.body || {};
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
});

module.exports = router;
