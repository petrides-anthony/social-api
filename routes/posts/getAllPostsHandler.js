const assert = require('assert');
const { BadRequest, NotFound } = require("http-errors");
const PostModel = require("../../models/post");

const getAllPostsHandler = async (req, res, next) => {
    try {
      const allRootPosts = await PostModel.find({ parentId: null });
      res.json(allRootPosts);
      next();
    } catch (error) {
      console.log('Error from GET all posts ->', error)
      next(error)
    }
  };

module.exports = getAllPostsHandler;