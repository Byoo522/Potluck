import { useEffect, useState } from 'react';
import { getComments, removeComment } from '../../store/comment'
import { useDispatch, useSelector } from 'react-redux'
import CommentForm from '../CommentForm';
import { useParams, useHistory } from 'react-router-dom'
import './CommentSection.css'


function CommentSection() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const comments = useSelector((state) => state?.comments)


  const data = {
    eventId: id,
  };

  useEffect(() => {
    dispatch(getComments(data));

  }, [])


  // need to pass in the comment id
  const handleDelete = (e) => {
    e.preventDefault();
    const commentId = e.target.value;
    dispatch(removeComment(commentId));
  }

  const handleEditClick = (e) => {
     e.preventDefault();
    const commentId = e.target.value;
    history.push(`/comments/edit/${commentId}`)
  }


  return (
    <div className='comment-container'>
      <div className='comments'>
        <table>
          <thead>
            <tr>
              <th>Comments</th>

            </tr>
          </thead>
          <tbody>
            {comments && Object.values(comments).map((comment) => (
              <tr key={comment?.id}>
                <td>
                  {comment?.content}
                </td>
                <td>
                  <button value={comment?.id} onClick={handleEditClick} className='button yellow-bg red comment-post-btn font'>Edit</button>
                  {/* <button value={comment?.id} onClick={handleEditClick}><i class="far fa-edit"></i></button> */}
                </td>
                <td>
                  <button value={comment?.id} onClick={handleDelete} className='button yellow-bg red comment-post-btn font'>Delete</button>
                  {/* <button value={comment?.id} onClick={handleDelete}><i class="far fa-trash-alt"></i></button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CommentForm />
    </div>
  )
}


export default CommentSection;
