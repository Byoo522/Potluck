const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
// need to import csurf and plug into calls
const { restoreUser, requireAuth } = require('../../utils/auth');

const { Event } = require('../../db/models')

// get all events
router.get('/', restoreUser, asyncHandler(async (req, res) => {
  const events = await Event.findAll();

  res.json(events);
}))

// create new event
router.post('/', asyncHandler(async (req, res) => {
  const { userId, title, max_guest, location, date, time, description } = req.body;

}))




module.exports = router;
