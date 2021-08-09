import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { createEvent, getEvents } from "../../store/event";
import { useDispatch, useSelector } from "react-redux";
import './EventFormPage.css'


function EventFormPage() {
  const userId = useSelector(state => state?.session.user.id)
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [max_guests, setMax_Guests] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');

  const addTitle = (e) => setTitle(e.target.value);
  const addMax_Guests = (e) => setMax_Guests(e.target.value);
  const addLocation = (e) => setLocation(e.target.value);
  const addDate = (e) => setDate(e.target.value);
  const addTime = (e) => setTime(e.target.value);
  const addDescription = (e) => setDescription(e.target.value);

  useEffect(() => {
    dispatch(getEvents());
    // return () => dispatch(UnloadEvents());
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      userId,
      title,
      max_guests,
      location,
      date,
      time,
      description,
    };

    const event = dispatch(createEvent(payload));
    dispatch(getEvents());
    if (event) {
      history.push('/events')
    }
  }

  return (
    <div className='new-event-page-container'>
      <div className='new-event-container font'>
        <form onSubmit={handleSubmit}>
          <h1>Create a New Event</h1>
          <label>Title</label>
          <input
            type="text"
            placeholder="Title for Event"
            min="1"
            required
            className='new-event-input font'
            value={title}
            onChange={addTitle} />
          <label>Date</label>
          <input
            type="date"
            placeholder="Date"
            required
            className='new-event-input font'
            value={date}
            onChange={addDate} />
          <label>Time</label>
          <input
            type="time"
            placeholder="Time"
            required
            className='new-event-input font'
            value={time}
            onChange={addTime} />
          <label>Max Guests</label>
          <input
            type="number"
            placeholder="Max Number of Guests"
            min="1"
            required
            className='new-event-input font'
            value={max_guests}
            onChange={addMax_Guests} />
          <label>Location</label>
          <input
            type="text"
            placeholder="Location"
            min="1"
            required
            className='new-event-input font'
            value={location}
            onChange={addLocation} />
          <label>Description</label>
          <textarea
            type="text"
            placeholder="Description"
            className='new-event-textarea font'
            value={description}
            onChange={addDescription} />
          <button type='submit' className='button font yellow-bg'>Create</button>
        </form>
      </div>
    </div>
  )
}


export default EventFormPage;
