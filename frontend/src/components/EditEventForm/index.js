import React, { useState, useEffect } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { updateEvent, getOneEvent, getEvents } from "../../store/event";
import { useDispatch, useSelector } from "react-redux";
import './EditEventForm.css'


function EditEventForm() {
  const userId = useSelector(state => state?.session.user.id)
  const { id } = useParams();
  const eventId = id;
  const currentEvent = useSelector(state => state.events.current)
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState(currentEvent.title);
  const [max_guests, setMax_Guests] = useState(currentEvent.max_guests);
  const [location, setLocation] = useState(currentEvent.location);
  const [date, setDate] = useState(currentEvent.date);
  const [time, setTime] = useState(currentEvent.time);
  const [description, setDescription] = useState(currentEvent.description);

  const updateTitle = (e) => setTitle(e.target.value);
  const updateMax_Guests = (e) => setMax_Guests(e.target.value);
  const updateLocation = (e) => setLocation(e.target.value);
  const updateDate = (e) => setDate(e.target.value);
  const updateTime = (e) => setTime(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);

  useEffect(() => {
    // dispatch(getOneEvent(eventId));

  }, [dispatch])

  const handleUpdate = (e) => {
    e.preventDefault();
    const payload = {
      eventId: currentEvent.id,
      userId: currentEvent.userId,
      title,
      max_guests: Number(max_guests),
      location,
      date,
      time,
      description,
    };

    dispatch(updateEvent(payload))
    dispatch(getEvents())
    history.push('/events')
  }

  return (
    <div className='edit-wrapper'>
      <div className='edit-event-page-container' >
        <div className='edit-event-container font log-cont'>
          <form className='edit-form'>
            <div className='new-event-header'>
              <h1 className='font red'>Revision Form</h1>
            </div>
            <label>Title</label>
            <input
              type="text"
              placeholder={`${currentEvent.title}`}
              min="1"
              required
              className='new-event-input font'
              value={title}
              onChange={updateTitle} />
            <label>Date</label>
            <input
              type="date"
              placeholder={`${currentEvent.date}`}
              required
              className='new-event-input font'
              value={date}
              onChange={updateDate} />
            <label>Time</label>
            <input
              type="time"
              placeholder={`${currentEvent.time}`}
              required
              className='new-event-input font'
              value={time}
              onChange={updateTime} />
            <label>Max Guests</label>
            <input
              type="number"
              placeholder={`${currentEvent.max_guests}`}
              min="1"
              required
              className='new-event-input font'
              value={max_guests}
              onChange={updateMax_Guests} />
            <label>Location</label>
            <input
              type="text"
              placeholder={`${currentEvent.location}`}
              min="1"
              required
              className='new-event-input font'
              value={location}
              onChange={updateLocation} />
            <label>Description</label>
            <textarea
              type="text"
              placeholder={`${currentEvent.description}`}
              required
              className='new-event-input font'
              value={description}
              onChange={updateDescription} />
            <div className='new-event-submit'>
              <button className='button font yellow-bg' type='submit' onClick={handleUpdate}>Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}


export default EditEventForm;
