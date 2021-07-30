const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
// need to import csurf and plug into calls
const { restoreUser, requireAuth } = require('../../utils/auth');

const { Event } = require('../../db/models');
// const { db } = require('../../db');

// GET ALL events
router.get('/', restoreUser, asyncHandler(async (req, res) => {
  const events = await Event.findAll();
  res.json(events);
}))

// GET ALL events for LOGGED IN USER
router.get('/', restoreUser, asyncHandler(async (req, res) => {
  const events = await Event.findAll();
  res.json(events);
}))

// GET ONE events for logged user
router.get('/:id', restoreUser, asyncHandler(async (req, res) => {
  const eventId = parseInt(req.params.id);
  const event = await Event.findByPk(eventId);
  res.json(event);
}))

// POST new event
router.post('/', asyncHandler(async (req, res) => {
  const { userId, title, max_guests, location, date, time, description } = req.body;
  const newEvent = await Event.create({ userId, title, max_guests, location, date, time, description })

  return res.json({ newEvent })
}))

// EDIT post
router.put('/:id', asyncHandler(async (req, res) => {
  const eventId = parseInt(req.params.id, 10);
  const event = await Event.findByPk(eventId);
  if (event) {
    const { title, max_guests, location, date, time, description } = req.body;
    await event.update({ title, max_guests, location, date, time, description });
    res.json({ event })
  }
}))

// DELETE event
router.delete('/:id', asyncHandler(async (req, res) => {
  const eventId = parseInt(req.params.id);
  const event = await Event.findByPk(eventId);
  if (event) {
    await event.destroy();
    return res.send('Successfully Deleted Event')
  }
}))


module.exports = router;
