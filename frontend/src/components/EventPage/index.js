// import hooks from 'react'
// import hooks from 'react-redux'
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import thunk creator
// import { getEvents } from "../../store/event";
import { getEvents,  removeEvent } from "../../store/event"; // prior
import './EventPage.css';
// import { csrfFetch } from "../../store/csrf";

const EventPage = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);
  const userId = useSelector((state) => state.session.user.id);

  useEffect(() => {
    dispatch(getEvents());
    // return () => dispatch(UnloadEvents());
  }, [])


  const handleDelete = (id) => {
    dispatch(removeEvent(userId, id));
  }



  return (
    <div className='form-wrapper'>
      <table className='event-form'>
        <thead>
          <tr>
            <th>Title</th>
            {/* <th>Max Guests</th> */}
            {/* <th>Location</th> */}
            <th>Date</th>
            {/* <th>Time</th> */}
            {/* <th>Description</th> */}
          </tr>
        </thead>
        <tbody>
          {events && Object.values(events).map((event) => (
            <tr key={event?.id}>
              <Link to={`/events/${event.id}`}>
                <td>{event?.title}</td>
              </Link>
              {/* <td>{event?.max_guests}</td> */}
              {/* <td>{event?.location}</td> */}
              <td>{event?.date}</td>
              {/* <td>{event?.time}</td> */}
              {/* <td>{event?.description}</td> */}
              {/* <Link to={`/events/${event.id}/edit`}>
                <button className='edit-btn yellow-bg red'>Edit</button>
              </Link> */}
              {/* <button className='delete-btn red-bg yellow' onClick={() => handleDelete(event?.id)}>Delete</button> */}
            </tr>
          ))}
          <Link to='/events/new'>
            <button className='create-event-btn yellow-bg red'>Create Event</button>
          </Link>
        </tbody>
      </table>
    </div >
  )
}


export default EventPage;
