import { csrfFetch } from "./csrf";
// Define Action Types as Constants
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



