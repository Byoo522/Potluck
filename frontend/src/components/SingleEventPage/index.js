import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getEvents, removeEvent, selectEvent } from "../../store/event";
import CommentSection from "../CommentSection";
import './SingleEventPage.css';
// import { csrfFetch } from "../../store/csrf";


function SingleEventPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const event = useSelector(state => state.events.current);
  const loaded = useSelector(state => state.events.loaded);

  useEffect(() => {
    if (!loaded) dispatch(getEvents())
  }, [dispatch, loaded]);

  useEffect(() => {
    if (loaded) dispatch(selectEvent(id));
  }, [dispatch, loaded, id]);


  const handleDelete = (id) => {
    dispatch(removeEvent(id));
    history.push('/events')
  }

  return event && (
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
              <td>{event?.title}</td>
              <td>{event?.max_guests}</td>
              <td>{event?.location}</td>
              <td>{event?.date}</td>
              <td>{event?.time}</td>
              <td>{event?.description}</td>
              <Link to={`/events/${event?.id}/edit`}>
                <button className='edit-btn yellow-bg red'>Edit</button>
              </Link>
              <button className='delete-btn red-bg yellow' onClick={() => handleDelete(event?.id)}>Delete</button>
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
