import { useEffect, useState } from 'react';
import { getComments, removeComment } from '../../store/comment'
import { useDispatch, useSelector } from 'react-redux'
import CommentForm from '../CommentForm';
import CommentRead from '../CommentRead';
import CommentEdit from '../CommentEdit';
import { useParams } from 'react-router-dom'


function CommentSection() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const comments = useSelector((state) => state?.comments)
  const [editCommentId, setEditCommentId] = useState(null)
  const [editCommentFormData, setCommentFormData] = useState({
    content: ''
  })

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

  const handleEditClick = (e, comment) => {
    e.preventDefault();
    setEditCommentId(comment.id);
    const formValues = {
      content: comment.content,
    }

    setCommentFormData(formValues)
  }

  const handleEditFormChange = e => {
    e.preventDefault();
    const fieldContent = e.target.getAttribute('content');
    const fieldValue = e.target.value

    const newFormData = { ...editCommentFormData }
    newFormData[fieldContent] = fieldValue

    setCommentFormData(newFormData)
  }

  const handleEditFormSave = (e) => {
    e.preventDefault();
    const editedContent = {
      id: editCommentId,
      content: editCommentFormData.content
    }

    // need to work dispatch
    const newContent = [...comments];

    const index = comments.findIndex((comment) => comment.id === editCommentId);

    newContent[index] = editedContent;


  }

  return (
    <div className='comments-container'>
      <form onSubmit={handleEditFormSave}>
        <table>
          <thead>
            <tr>
              <th>Comments</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className='comments-section'>
            {comments && Object.values(comments).map((comment, i) => (
              <>
                {editCommentId === comment.id ? (
                <CommentEdit editCommentFormData={editCommentFormData} handleEditFormChange={handleEditFormChange}/>
                ) : (
                  <CommentRead comment={comment} handleEditClick={handleEditClick} />)}
                {/* <button>Edit</button> */}
                <button value={comment?.id} onClick={handleDelete}>Delete</button>
              </>
            ))}
          </tbody>
        </table>
      </form>
      <CommentForm />
    </div>
  )
}


export default CommentSection;
