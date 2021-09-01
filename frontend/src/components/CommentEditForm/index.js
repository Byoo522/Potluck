import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { updateComment, getComments } from "../../store/comment";


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
    <div>
      <h4>Revise your comment</h4>
      <form className='comment-form'>
        <input
          type="text"
          row='5'
          placeholder={`${currentContent}`}
          min="1"
          required
          value={content}
          onChange={updateContent} />
      </form>
      <button onClick={handleEdit}>Save</button>
    </div>
  )
}


export default CommentEditForm;
