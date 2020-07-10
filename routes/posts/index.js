const express = require("express");
const router = express.Router();

const getAllPostsHandler = require('./getAllPostsHandler');
const getPostByIdHandler = require('./getPostByIdHandler');
const addPostHandler = require('./addPostHandler');
const addCommentHandler = require('./addCommentHandler');

// GET
router.get('/', getAllPostsHandler);
router.get('/:id', getPostByIdHandler);

// // POST
router.post('/', addPostHandler);
router.post('/:id/comment', addCommentHandler);

module.exports = router;

// *** Completed ***
// - Update Get Posts to only get posts where parentId is null [ x ]
// - Update Add Comments function to only add comment if req.param.id exists for a post [x]
// - Update Add Comments function so that it updates the parent post's 'lastestComment' attribute [x]
// *** To Do's ***
// - Add a Get Comments function [ ]
// - Add a Get All Comments for a given post function [ ]
// - Add a Like function /posts/id/like [ ] Note: Mongo comes with an increment feature for this...
// ...so you don't have to do like = likes +1