const assert = require('assert');
const { BadRequest, NotFound } = require("http-errors");
const PostModel = require("../../models/post");

const addCommentHandler = async (req, res, next) => {
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
  
  };

module.exports = addCommentHandler;