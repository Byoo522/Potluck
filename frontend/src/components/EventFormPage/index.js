import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { createEvent, getEvents, UnloadEvents } from "../../store/event";
import { useDispatch, useSelector } from "react-redux";


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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title for Event"
          min="1"
          required
          value={title}
          onChange={addTitle} />
        <input
          type="date"
          placeholder="Date"
          required
          value={date}
          onChange={addDate} />
        <input
          type="time"
          placeholder="Time"
          required
          value={time}
          onChange={addTime} />
        <input
          type="number"
          placeholder="Max Number of Guests"
          min="1"
          required
          value={max_guests}
          onChange={addMax_Guests} />
        <input
          type="text"
          placeholder="Location"
          min="1"
          required
          value={location}
          onChange={addLocation} />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={addDescription} />
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}


export default EventFormPage;
