import { useEffect } from 'react';
import { getComments, removeComment, editComment, selectComment } from '../../store/comment'
import { useDispatch, useSelector } from 'react-redux'
import CommentForm from '../CommentForm';
import { useParams } from 'react-router-dom'


function CommentSection() {
  const dispatch = useDispatch();
  const { id } = useParams();
  // const eventId = useSelector(state => state?.events[id])
  // const userId = useSelector((state) => state?.session.user.id)
  const loaded = useSelector(state => state.comments.loaded);
  const comments = useSelector((state) => state?.comments.all)
  const commentId = useSelector(state => state?.comments.id)

  console.log('LOOK AT THIS HERE!!!!!', commentId)

  const payload = {
    eventId: id,
  };

  useEffect(() => {
    if(!loaded) dispatch(getComments())
  }, [dispatch, loaded])

  useEffect(() => {
    if (loaded) dispatch(selectComment(id));
  }, [dispatch, loaded, id]);

  // useEffect(() => {
  //   dispatch(getComments(payload));

  // }, [])


  // need to pass in the comment id
  const handleDelete = (value) => {
    dispatch(removeComment(value));
    // history.push('/events')
  }

  return (
    <div className='comments-container'>
      <h1>Comments sections</h1>
      {comments && Object.values(comments).map((comment) => (
        <div>
          <h4 key={comment?.id}>{comment?.content}</h4>
          <button>Edit</button>
          <button value={comment?.id} onClick={handleDelete}>Delete</button>
        </div>
      ))}
      <CommentForm />
    </div>
  )
}


export default CommentSection;
