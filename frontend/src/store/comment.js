import { csrfFetch } from "./csrf";
// Defining Action Types as Constants
export const SET_COMMENTS = 'comments/SET_COMMENTS';
export const ADD_COMMENT = 'comment/ADD_COMMENT';


// Defining Action Creator - functions that encapsulate the process of creation of an action object.
const setComments = (comments) => ({
  type: SET_COMMENTS,
  comments,
})

const addComment = (comment) => ({
  type: ADD_COMMENT,
  comment,
})


// Defining Thunks - middleware that allows you to return functions, rather than just actions, within Redux.
// export const getComments = (id) => async (dispatch) => {
//   const res = await csrfFetch(`/api/comments/${id}`);
//   const comments = await res.json();
//   dispatch(setComments(comments));
// }
export const getComments = (data) => async (dispatch) => {
  const eventId = data.eventId;
  const res = await csrfFetch(`/api/comments/${eventId}`);
  const comments = await res.json();
  dispatch(setComments(comments));
}

export const postComment = (data) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments/post`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (res.ok) {
    const comment = await res.json();
    dispatch(addComment(comment.newComment))
    return res
  }
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
    case ADD_COMMENT:
      return { ...state, [action.comment.id]: action.comment }
    default:
      return state;
  }
};


export default commentsReducer;
