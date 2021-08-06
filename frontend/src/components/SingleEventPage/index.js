import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getEvents, removeEvent } from "../../store/event";
import CommentSection from "../CommentSection";
import './SingleEventPage.css';
// import { csrfFetch } from "../../store/csrf";


function SingleEventPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const events = useSelector((state) => state.events);
  // const userId = useSelector((state) => state.session.user.id);

  useEffect(() => {
    dispatch(getEvents());

  }, [])

  const handleDelete = (id) => {
    dispatch(removeEvent(id));
    history.push('/events')
  }

  return (
    <div className='single-event-container'>
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
            <tr>
              <td>{events[id]?.title}</td>
              <td>{events[id]?.max_guests}</td>
              <td>{events[id]?.location}</td>
              <td>{events[id]?.date}</td>
              <td>{events[id]?.time}</td>
              <td>{events[id]?.description}</td>
              <Link to={`/events/${events[id]?.id}/edit`}>
                <button className='edit-btn yellow-bg red'>Edit</button>
              </Link>
              <button className='delete-btn red-bg yellow' onClick={() => handleDelete(events[id]?.id)}>Delete</button>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='comment-section-container'>
        <CommentSection />
      </div>
    </div >
  )
}


export default SingleEventPage;
