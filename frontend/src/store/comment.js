import { csrfFetch } from "./csrf";
// Defining Action Types as Constants
export const SET_COMMENTS = 'comments/SET_COMMENTS';


// Defining Action Creator - functions that encapsulate the process of creation of an action object.
const setComments = (comments) => ({
  type: SET_COMMENTS,
  comments,
})


// Defining Thunks - middleware that allows you to return functions, rather than just actions, within Redux.
export const getComments = () => async (dispatch) => {
  const res = await csrfFetch(`/api/comments`);
  const comments = await res.json();
  dispatch(setComments(comments));
}

// Defining a reducer - accept state and action, returns next state and action
const initialState = {};
const commentsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_COMMENTS:
      const allComments = {};
      action.comments.forEach((comment) => {
        allComments[comment.id] = comment;
      });
      return { ...allComments }
    default:
      return state;
  }
};


export default commentsReducer;
