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

const setOneEvent = (event) => ({
  type: SET_ONE_EVENT,
  event,
})

const addEvent = (event) => ({
  type: ADD_EVENT,
  event,
})

const editEvent = (event) => ({
  type: EDIT_EVENT,
  event,
})

const deleteEvent = (event) => ({
  type: REMOVE_EVENT,
  event,
})

export const UnloadEvents = () => ({
  type: UNLOAD_EVENTS
})


// Defining Thunks
// get all
export const getEvents = () => async (dispatch) => {
  const res = await csrfFetch('/api/events');
  const events = await res.json();
  dispatch(setEvent(events))
};

export const getOneEvent = (eventId) => async (dispatch) => {
  const res = await csrfFetch(`/api/events/${eventId}`);
  const event = await res.json();
  dispatch(setOneEvent(event))
};

// export const createEvent = (data) => async (dispatch) => {
//   const { event } = await csrfFetch.get('api/events/');
//   dispatch(addEvent(event))

// }

export const createEvent = (data) => async (dispatch) => {
  const res = await csrfFetch('/api/events/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (res.ok) {
    console.log('res is okay')
    const event = await res.json();
    dispatch(addEvent(event.newEvent))
    return res
  }
}

export const updateEvent = (data, eventId) => async (dispatch) => {
  const res = await csrfFetch(`/api/events/${eventId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (res.ok) {
    const { event } = await res.json();
    dispatch(editEvent(event))
    return res
  }
}

export const removeEvent = (eventId) => async (dispatch) => {
  const res = await csrfFetch(`/api/events/delete/${eventId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  });

  if (res.ok) {
    const data = await res.json();
    if (data.errors) {
      return data.errors
    } else {
      // dispatch(deleteEvent(data.events))
      dispatch(deleteEvent(data))
    }
    return res
  }
}

const initialState = {};

// Defining a reducer - accept state and action, returns next state and action
const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EVENT:
      const allEvents = {};
      action.events.forEach((event) => {
        // normalize event
        allEvents[event.id] = event;
      });
      return { ...allEvents };
    case SET_ONE_EVENT:
      const oneNewState = {};
      oneNewState[action.event.id] = action.event;
      return { ...oneNewState };
    case ADD_EVENT:
      return { ...state, [action.event.id]: action.event }
    case REMOVE_EVENT:
      const newState = { ...state };
      delete newState[action.event.id]
      return { ...newState }
    // case REMOVE_EVENT:
    //   const newState = {};
    //   action.events.forEach((event) => {
    //     newState[event.id] = event;
    //   });
    //   return { ...newState }
    case EDIT_EVENT:
      return { ...state, [action.event.id]: action.event }
    // case UNLOAD_EVENTS:
    //   return {
    //     ...initialState,
    //     all: {
    //       ...initialState.all
    //     }
    //   }
    default:
      return state;
  }
};

// Exporting the reducer
export default eventsReducer;


// window test
// window.store.dispatch(window.eventActions.getEvents());
