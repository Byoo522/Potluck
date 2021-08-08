const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const { restoreUser, requireAuth } = require('../../utils/auth');
const { Comment } = require('../../db/models')

// GET ALL COMMENTS
router.get('/:id(\\d+)', restoreUser, requireAuth, asyncHandler(async (req, res) => {
  const idInfo = parseInt(req.params.id, 10)
  const comments = await Comment.findAll({
    where: {
      eventId: idInfo
    }
  }
  );
  res.json(comments);
}))


router.post('/post', restoreUser, requireAuth, asyncHandler(async (req, res) => {
  const commentData = req.body
  const newComment = await Comment.create(commentData)
  return res.json({ newComment })
}))



// EDIT comment
router.put('/edit/:id(\\d+)', restoreUser, requireAuth, asyncHandler(async (req, res) => {
  const { id, content } = req.body;
  console.log('id, content, dskaldksaokdosakdoksakdoask', id, content)
  const comment = await Comment.findByPk(id);
  if (comment) {
    await comment.update({ content });
    res.json(comment)
  }
}))

// DELETE event

router.delete('/delete', restoreUser, requireAuth, asyncHandler(async (req, res) => {
  const { id } = req.body;
  const comment = await Comment.findByPk(id);
  await comment.destroy();
  res.json(comment);
}))

module.exports = router;
