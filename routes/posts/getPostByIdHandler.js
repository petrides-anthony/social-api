const assert = require('assert');
const { BadRequest, NotFound } = require("http-errors");
const PostModel = require("../../models/post");

const getPostByIdHandler = async (req, res, next) => {
  try {
    assert.ok(req.params.id.length === 24, new BadRequest('Invalid ObjectId'));

    // NB: This currently also returns comments.
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
};

  module.exports = getPostByIdHandler;