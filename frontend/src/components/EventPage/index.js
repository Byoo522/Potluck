// import hooks from 'react'
// import hooks from 'react-redux'
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import thunk creator
// import { getEvents } from "../../store/event";
import { getEvents, removeEvent } from "../../store/event"; // prior
import './EventPage.css';
// import { csrfFetch } from "../../store/csrf";

const EventPage = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.all);
  const userId = useSelector((state) => state.session.user.id);

  useEffect(() => {
    dispatch(getEvents());
    // return () => dispatch(UnloadEvents());
  }, [])


  return (
    <div className='event-page-wrapper'>
      <div className='form-wrapper'>
        <table className='styled-table'>
          <thead>
            <tr>
              <th>Upcoming Events</th>
              {/* <th>Date</th> */}
            </tr>
          </thead>
          <tbody>
            {events && Object.values(events).map((event) => (
              <tr key={event?.id}>
                <Link to={`/events/${event.id}`} className='event-page-link font red'>
                  <td>{event?.title}</td>
                </Link>
                {/* <td>{event?.date}</td> */}
              </tr>
            ))}
            <div className='create-btn-container'>
              <Link to='/events/new'>
                <button className='button yellow-bg red'>Create Event</button>
              </Link>
            </div>
          </tbody>
        </table>
      </div >
    </div>
  )
}


export default EventPage;
