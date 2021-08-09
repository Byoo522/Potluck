import { useEffect, useState } from 'react';
import { getComments, removeComment } from '../../store/comment'
import { useDispatch, useSelector } from 'react-redux'
import CommentForm from '../CommentForm';
import { useParams, useHistory } from 'react-router-dom'
import './CommentSection.css'
// USE FOR TERNARY
// import CommentRead from '../CommentRead';
// import CommentEdit from '../CommentEdit';


function CommentSection() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const comments = useSelector((state) => state?.comments)
  // const [comment, setComment] = useState(comments)

  // FOR TERNARY TOGGLE
  // const [editCommentId, setEditCommentId] = useState(null)
  // const [editCommentFormData, setCommentFormData] = useState({
  //   content: ''
  // })


  const data = {
    eventId: id,
  };

  useEffect(() => {
    dispatch(getComments(data));

  }, [])


  // need to pass in the comment id
  const handleDelete = (e) => {
    const commentId = e.target.value;
    dispatch(removeComment(commentId));
  }

  const handleEditClick = (e) => {
    const commentId = e.target.value;
    history.push(`/comments/edit/${commentId}`)
  }



  // FOR TERNARY TOGGLE EDIT
  // const handleEditClick = (e, comment) => {
  //   e.preventDefault();
  //   setEditCommentId(comment.id);
  //   const formValues = {
  //     content: comment.content,
  //   }

  //   setCommentFormData(formValues)
  // }

  // const handleEditFormChange = e => {
  //   e.preventDefault();
  //   const fieldContent = e.target.getAttribute('content');
  //   const fieldValue = e.target.value

  //   const newFormData = { ...editCommentFormData }
  //   newFormData[fieldContent] = fieldValue

  //   setCommentFormData(newFormData)
  // }



  return (
    <div className='comment-container'>
      <div className='comments'>
        <table>
          <thead>
            <tr>
              <th>Comments</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {comments && Object.values(comments).map((comment) => (
              <tr key={comment?.id}>
                <td>
                  {comment?.content}
                </td>
                <td>
                  <button value={comment?.id} onClick={handleEditClick}><i class="far fa-edit"></i></button>
                </td>
                <td>
                  <button value={comment?.id} onClick={handleDelete}><i class="far fa-trash-alt"></i></button>
                </td>
              </tr>
            ))}
          </tbody>
          {/* refactor for ternary toggle */}
          {/* <tbody className='comments-section'>
            {comments && Object.values(comments).map((comment, i) => (
              <>
                {editCommentId === comment.id ? (
                  <CommentEdit editCommentFormData={editCommentFormData} handleEditFormChange={handleEditFormChange} />
                ) : (
                  <CommentRead comment={comment} handleEditClick={handleEditClick} />)}
              </>
            ))}
          </tbody> */}
        </table>
      </div>
      <CommentForm />
    </div>
  )
}


export default CommentSection;
