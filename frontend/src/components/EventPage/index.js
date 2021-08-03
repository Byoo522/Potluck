// import hooks from 'react'
// import hooks from 'react-redux'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import thunk creator
import { getEvents } from "../../store/event";

const EventPage = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => Object.values(state.events));

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch])
  return (
    <div>
      <table>
        <thead>
          <tr>title</tr>
          <tr>max_guests</tr>
          <tr>location</tr>
          <tr>date</tr>
          <tr>time</tr>
          <tr>description</tr>
          {events && events.map((event) => (
            <tr key={event.id}>{event.title}</tr>
          ))}
        </thead>
        <tbody>
        </tbody>
      </table>
      <button>Create Event</button>
    </div>
  )
}


export default EventPage;
