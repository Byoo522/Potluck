import { csrfFetch } from "./csrf";
// Defining Action Types as Constants
export const SET_EVENT = 'events/SET_EVENT';
export const SET_ONE_EVENT = 'events/SET_ONE_EVENT'
export const ADD_EVENT = 'events/ADD_EVENT';
export const EDIT_EVENT = 'events/EDIT_EVENT';
export const REMOVE_EVENT = 'events/REMOVE_EVENT';
export const UNLOAD_EVENTS = 'events/UNLOAD';

// Define Action Creators
const setEvent = (events) => ({
  type: SET_EVENT,
  events,
})

const addEvent = (event) => ({
  type: ADD_EVENT,
  event,
})

const editEvent = (event) => ({
  type: EDIT_EVENT,
  event,
})

const deleteEvent = (eventId) => ({
  type: REMOVE_EVENT,
  eventId,
})

export const UnloadEvents = () => ({
  type: UNLOAD_EVENTS
})


// Defining Thunks
export const getEvents = () => async (dispatch) => {
  const res = await csrfFetch('/api/events');
  const events = await res.json();
  dispatch(setEvent(events))
};



export const createEvent = (data) => async (dispatch) => {
  const res = await csrfFetch('/api/events/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (res.ok) {
    const event = await res.json();
    dispatch(addEvent(event.newEvent))
    return res
  }
}

export const updateEvent = (event) => async (dispatch) => {
  const res = await csrfFetch(`/api/events/edit`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(event)
  });

  if (res.ok) {
    // const event = await res.json();
    // dispatch(editEvent(event.updatedEvent))
    // const { event } = await res.json();
    const updatedEvent = await res.json();
    dispatch(editEvent(updatedEvent));
    return res
  }
}

export const removeEvent = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/events/delete/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id })
  });

  if (res.ok) {
    const data = await res.json();
    if (data.errors) {
      return data.errors
    } else {
      dispatch(deleteEvent(id))
    }
    return res
  }
}

const initialState = {};

// Defining a reducer - accept state and action, returns next state and action
const eventsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_EVENT:
      const allEvents = {};
      action.events.forEach((event) => {
        allEvents[event.id] = event;
      });
      return { ...allEvents };
    case ADD_EVENT:
      return { ...state, [action.event.id]: action.event }
    case REMOVE_EVENT:
      newState = { ...state };
      delete newState[action.eventId]
      return newState
    case EDIT_EVENT:
      return { ...state, [action.event.id]: action.event }
    default:
      return state;
  }
};

// Exporting the reducer
export default eventsReducer;


// window test
// window.store.dispatch(window.eventActions.getEvents());
