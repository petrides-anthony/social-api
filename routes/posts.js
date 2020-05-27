const express = require("express");
const assert = require('assert');
const { BadRequest } = require("http-errors");

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ text: 'posts index' });
});

router.get('/:id', (req, res) => {
  res.json({ text: `post id = ${req.params.id}` });
});

router.post('/', (req, res) => {
    const { user, content } = req.body || {};
    assert.ok(user !== undefined, new BadRequest('`user` is missing'));
    assert.ok(typeof user === 'string', new BadRequest('`user` needs to be of type string'));
    assert.ok(content !== undefined, new BadRequest('`content` is missing'));
    assert.ok(typeof content === 'string', new BadRequest('`content` needs to be of type string'));

    // TODO: add new post to the db

    // create the post
    // add the post to the db

    res.json({ user, content });
});

module.exports = router;
