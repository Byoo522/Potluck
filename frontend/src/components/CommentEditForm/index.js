import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { updateComment, getComments } from "../../store/comment";
import './CommentEditForm.css'


function CommentEditForm() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const currentComment = useSelector(state => state.comments[id])
  const currentEventId = currentComment.eventId
  const commentId = currentComment.id;
  const currentContent = currentComment.content;

  const [content, setContent] = useState(currentContent)

  const updateContent = (e) => setContent(e.target.value)

  const handleEdit = (e) => {
    const newData = {
      id: commentId,
      content: content
    }
    dispatch(updateComment(newData))
    history.push(`/events/${currentEventId}`)
  }


  return (
    <div className='comment-wrapper'>
      <div className='comment-event-page-container'>
        <div className='comment-event-container font log-cont'>
          <form className='comment-form'>
            <div className='new-event-header'>
              <h1 className='font red'>Revise your comment</h1>
            </div>
            <label>Prior Comment</label>
            <input
              type="text"
              row='5'
              placeholder={`${currentContent}`}
              min="1"
              required
              className='new-event-input font'
              value={content}
              onChange={updateContent} />
          </form>
          <div className='new-event-submit'>
            <button onClick={handleEdit} className='button font yellow-bg'>Save</button>
          </div>
        </div>
      </div>
    </div>
  )
}


export default CommentEditForm;
