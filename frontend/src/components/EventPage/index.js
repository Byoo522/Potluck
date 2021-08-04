// import hooks from 'react'
// import hooks from 'react-redux'
import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import thunk creator
import eventsReducer, { getEvents, UnloadEvents, removeEvent } from "../../store/event";
import './EventPage.css';
import { csrfFetch } from "../../store/csrf";

const EventPage = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => Object.values(state.events));
  const [allEvents, setAllEvents] = useState(events)
  const userId = useSelector((state) => state.session.user.id);

  useEffect(() => {
    dispatch(getEvents());
    // return () => dispatch(UnloadEvents());
  }, [])

  useEffect(() => {
    setAllEvents(events)
    // return () => dispatch(UnloadEvents());
  }, [events])

  const handleDelete = (id) => {
    dispatch(removeEvent(userId, id));
    setAllEvents(events);
  }


  return (
    <div className='form-wrapper'>
      <table className='event-form'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Max Guests</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {allEvents && allEvents.map((event) => (
            <tr key={event?.id}>
              <td>{event?.title}</td>
              <td>{event?.max_guests}</td>
              <td>{event?.location}</td>
              <td>{event?.date}</td>
              <td>{event?.time}</td>
              <td>{event?.description}</td>
              <button className='edit-btn yellow-bg red'>Edit</button>
              <button className='delete-btn red-bg yellow' onClick={() => handleDelete(event?.id)}>Delete</button>
            </tr>
          ))}
          <Link to='/event/new'>
            <button className='create-event-btn yellow-bg red'>Create Event</button>
          </Link>
        </tbody>
      </table>
    </div >
  )
}


export default EventPage;
