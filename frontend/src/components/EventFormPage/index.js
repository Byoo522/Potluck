import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { createEvent, eventActions } from "../../store/event";
import { useDispatch, useSelector } from "react-redux";


function EventFormPage() {
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


  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title,
      max_guests,
      location,
      date,
      time,
      description,
    };
    const event = await dispatch(eventActions.createEvent(payload));
    if (event) {
      history.push('api/events')
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
          type="number"
          placeholder="Max Number of Guests"
          min="1"
          required
          value={max_guests}
          onChange={addMax_Guests} />
      </form>
    </div>
  )
}


export default createEvent;
