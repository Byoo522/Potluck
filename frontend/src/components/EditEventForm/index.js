import React, { useState, useEffect } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { updateEvent, getOneEvent, getEvents } from "../../store/event";
import { useDispatch, useSelector } from "react-redux";


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
    <div>
      <h4>Edit Event Form</h4>
      <form >
        <input
          type="text"
          placeholder={`${currentEvent.title}`}
          min="1"
          required
          value={title}
          onChange={updateTitle} />
        <input
          type="date"
          placeholder={`${currentEvent.date}`}
          required
          value={date}
          onChange={updateDate} />
        <input
          type="time"
          placeholder={`${currentEvent.time}`}
          required
          value={time}
          onChange={updateTime} />
        <input
          type="number"
          placeholder={`${currentEvent.max_guests}`}
          min="1"
          required
          value={max_guests}
          onChange={updateMax_Guests} />
        <input
          type="text"
          placeholder={`${currentEvent.location}`}
          min="1"
          required
          value={location}
          onChange={updateLocation} />
        <input
          type="text"
          placeholder={`${currentEvent.description}`}
          value={description}
          onChange={updateDescription} />
        <button type='submit' onClick={handleUpdate}>Update</button>
      </form>
    </div>
  )
}


export default EditEventForm;
