import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getOneEvent, removeEvent } from "../../store/event";
import './SingleEventPage.css';
// import { csrfFetch } from "../../store/csrf";


function SingleEventPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const events = useSelector((state) => state.events);
  // const userId = useSelector((state) => state.session.user.id);

  useEffect(() => {
    dispatch(getOneEvent(params.id));

  }, [])

  const handleDelete = (id) => {
    console.log(id)
    dispatch(removeEvent(id));
    history.push('/events')
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
          {events && Object.values(events).map((event) => (
            <tr>
              <td>{event?.title}</td>
              <td>{event?.max_guests}</td>
              <td>{event?.location}</td>
              <td>{event?.date}</td>
              <td>{event?.time}</td>
              <td>{event?.description}</td>
              <Link to={`/events/${event.id}/edit`}>
                <button className='edit-btn yellow-bg red'>Edit</button>
              </Link>
              <button className='delete-btn red-bg yellow' onClick={() => handleDelete(event?.id)}>Delete</button>
            </tr>
          ))}
        </tbody>
      </table>
    </div >
  )
}


export default SingleEventPage;
