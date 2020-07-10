const assert = require('assert');
const { BadRequest, NotFound } = require("http-errors");
const PostModel = require("../../models/post");

const addPostHandler = async (req, res, next) => {
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
  };

  // export default addPostHandler;

  module.exports = addPostHandler;
  