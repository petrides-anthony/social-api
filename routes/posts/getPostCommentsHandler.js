const assert = require('assert');
const { BadRequest, NotFound } = require("http-errors");
const PostModel = require("../../models/post");

const getPostCommentsHandler = async (req, res, next) => {
  try {
    
    assert.ok(req.params.id.length === 24, new BadRequest('Invalid ObjectId'));

    const allRootPosts = await PostModel.find({ parentId: req.params.id });
    res.json(allRootPosts);
    next();
  } catch (error) {
    console.log('Error from GET all posts ->', error)
    next(error)
  }
};

module.exports = getPostCommentsHandler;