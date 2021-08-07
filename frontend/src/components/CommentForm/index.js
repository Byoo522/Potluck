import { useEffect, useState } from 'react';
import { getComments, postComment } from '../../store/comment'
import { useDispatch, useSelector, } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';



function CommentForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  // const { id } = useParams();
  const userId = useSelector(state => state?.session.user.id)
  // const eventId = useSelector(state => state?.event.id)

  const [content, setContent] = useState('');
  const addContent = (e) => setContent(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      userId,
      // eventId,
      content,
    };

    dispatch(postComment(payload));
    setContent('')

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text-area'
          placeholder='Add a comment...'
          required
          value={content}
          onChange={addContent}
        />
        <button type='submit'>Post</button>
      </form>
    </div>
  )
}

export default CommentForm;
