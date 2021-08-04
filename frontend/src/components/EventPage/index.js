// import hooks from 'react'
// import hooks from 'react-redux'
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import thunk creator
import { getEvents } from "../../store/event";
import './EventPage.css';

const EventPage = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => Object.values(state.events));

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch])

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
          {events && events.map((event) => (
            <tr key={event.id}>
              <td>{event.title}</td>
              <td>{event.max_guests}</td>
              <td>{event.location}</td>
              <td>{event.date}</td>
              <td>{event.time}</td>
              <td>{event.description}</td>
              <button className='edit-btn yellow-bg red'>Edit</button>
              <button className='delete-btn red-bg yellow'>Delete</button>
            </tr>
          ))}
          {/* <NavLink to='event/new'>
          </NavLink> */}
          <a href='/event/new'>
            <button className='create-event-btn yellow-bg red'>Create Event</button>
          </a>
        </tbody>
      </table>
    </div>
  )
}


export default EventPage;