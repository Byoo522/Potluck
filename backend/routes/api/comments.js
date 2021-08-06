const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const { restoreUser, requireAuth } = require('../../utils/auth');
const { Comment } = require('../../db/models')

// GET ALL COMMENTS
router.get('/', restoreUser, requireAuth, asyncHandler(async (req, res) => {
  const comments = await Comment.findAll();
  res.json(comments);
}))

// GET ONE events for logged user
// router.get('/:id', restoreUser, requireAuth, asyncHandler(async (req, res) => {
//   const commentId = parseInt(req.params.id);
//   const comment = await Event.findByPk(commentId);
//   res.json(comment);
// }))


// POST new comment
// router.post('/post', restoreUser, requireAuth, asyncHandler(async (req, res) => {
//   const { userId, eventId, content } = req.body;
//   const event = await Event.findOne({
//     where: {
//       eventId: eventId,
//       userId: userId
//     }
//   })
//   const newComment = await event.create({ content })
//   return res.json({ newComment })
// }))

router.post('/post', restoreUser, requireAuth, asyncHandler(async (req, res) => {
  const { userId, eventId, content } = req.body;
  const newComment = await Comment.create({ userId, eventId, content })
  return res.json({ newComment })
}))



// EDIT comment
router.put('/edit', restoreUser, requireAuth, asyncHandler(async (req, res) => {
  const { userId, eventId, content } = req.body;
  const comment = await Comment.findByPk(commentId);
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
