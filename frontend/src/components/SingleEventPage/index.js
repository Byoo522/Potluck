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
      <div className='form-wrapper-single'>
        <table className='styled-table-left'>
          <thead>
            <tr>
              <th></th>
              <th className='title-center'>Event</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Title</th>
              <td>{event?.title}</td>
            </tr>
            <tr>
              <th>Max Guests</th>
              <td>{event?.max_guests}</td>
            </tr>
            <tr>
              <th>Location</th>
              <td>{event?.location}</td>
            </tr>
            <tr>
              <th>Date</th>
              <td>{event?.date}</td>
            </tr>
            <tr>
              <th>Time</th>
              <td>{event?.time}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{event?.description}</td>
            </tr>
            <td>
              <Link to={`/events/${event?.id}/edit`}>
                <button className='button yellow-bg red'>Edit</button>
              </Link>
            </td>
            <td>
              <button className='button red-bg yellow' onClick={() => handleDelete(event?.id)}>Delete</button>
            </td>
          </tbody>
        </table>
      </div>
      <CommentSection />
    </div >
  )
}


export default SingleEventPage;
