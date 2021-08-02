import { csrfFetch } from "./csrf";
// Defining Action Types as Constants
export const SET_EVENT = 'events/SET_EVENT';
export const ADD_EVENT = 'events/ADD_EVENT';
export const EDIT_EVENT = 'events/EDIT_EVENT';
export const REMOVE_EVENT = 'events/REMOVE_EVENT';

// Define Action Creators
const setEvent = (event) => ({
  type: SET_EVENTS,
  payload: event,
})

const addEvent = (event) => ({
  type: ADD_EVENT,
  payload: event,
})

const editEvent = (event) => ({
  type: EDIT_EVENT,
  payload: event,
})

const removeEvent = (event) => ({
  type: REMOVE_EVENT,
  payload: event,
})


// Defining Thunks
export const getEvents = () => async (dispatch) => {
  const res = await csrfFetch('/api/events');
  const events = await res.json();
  dispatch(setEvent(events))
};

// Defining initial state
const initialState = {};

// Defining a reducer
const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EVENT:
      const allEvents = {};
      action.events.forEach((event) => {
        // normalizing event
        allEvents(event.id) = event;
      });
      return {
        ...state,
        ...allEvents,
      };
    default:
      return state;
  }
};

// Exporting the reducer
export default eventsReducer;
