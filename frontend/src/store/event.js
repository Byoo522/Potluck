import { csrfFetch } from "./csrf";
// Defining Action Types as Constants
export const SET_EVENT = 'events/SET_EVENT';
export const ADD_EVENT = 'events/ADD_EVENT';
export const EDIT_EVENT = 'events/EDIT_EVENT';
export const REMOVE_EVENT = 'events/REMOVE_EVENT';

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

const removeEvent = (event) => ({
  type: REMOVE_EVENT,
  event,
})


// Defining Thunks
export const getEvents = () => async (dispatch) => {
  const res = await csrfFetch('/api/events');
  const events = await res.json();
  dispatch(setEvent(events))
};

export const createEvent = (data) => async (dispatch) => {
  const res = await csrfFetch(`api/events/new`, {
    method: ['POST'],
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (res.ok) {
    const event = await res.json();
    dispatch(addEvent(event))
  }
}

// Defining initial state
const initialState = {};

// Defining a reducer - accept state and action, returns next state and action
const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EVENT:
      const allEvents = {};
      action.events.forEach((event) => {
        // normalizing event
        allEvents[event.id] = event;
      });
      return { ...state, ...allEvents, };
    case ADD_EVENT:
      return { ...state, [action.event.id]: action.event }
    default:
      return state;
  }
};

// Exporting the reducer
export default eventsReducer;


// window test
// window.store.dispatch(window.eventActions.getEvents());
