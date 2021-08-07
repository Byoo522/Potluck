const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
// need to import csurf and plug into calls

const { restoreUser, requireAuth } = require('../../utils/auth');

const { Event, Comment } = require('../../db/models');

// const { Events } = require('pg');
// const { db } = require('../../db');

// GET ALL events
router.get('/', restoreUser, requireAuth, asyncHandler(async (req, res) => {
  const events = await Event.findAll();
  res.json(events);
}))


// POST new event
router.post('/', restoreUser, requireAuth, asyncHandler(async (req, res) => {
  const { userId, title, max_guests, location, date, time, description } = req.body;
  const newEvent = await Event.create({ userId, title, max_guests, location, date, time, description })
  return res.json({ newEvent })
}))

// EDIT post
router.put('/edit', restoreUser, requireAuth, asyncHandler(async (req, res) => {
  const { eventId, title, max_guests, location, date, time, description } = req.body;
  const event = await Event.findByPk(eventId);
  if (event) {
    await event.update({ title, max_guests, location, date, time, description });
    res.json(event)
  }
}))

// DELETE event
router.delete('/delete', restoreUser, requireAuth, asyncHandler(async (req, res) => {
  const { id } = req.body;
  const event = await Event.findByPk(id);
  const comments = await Comment.findAll({
    where: {
      eventId: id
    }
  })
  if (comments) {
    comments.forEach((comment) => {
      comment.destroy();
    })
  }
  await event.destroy();

  res.json(event);
}))



module.exports = router;
