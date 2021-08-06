import { useEffect } from 'react';
import { getComments } from '../../store/comment'
import { useDispatch, useSelector } from 'react-redux'


function CommentSection() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.user.id)
  const comments = useSelector((state) => state.comments)
  console.log(comments)

  useEffect(() => {
    dispatch(getComments());

  }, [])

  return (
    <div className='comments-container'>
      <h1>Comments sections</h1>
      {comments && Object.values(comments).map((comment) => (
        <h4 key={comment?.id}>{comment?.content}</h4>
      ))}
    </div>
  )
}


export default CommentSection;
