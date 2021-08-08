// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux'
// import { getComments, updateComment } from '../../store/comment';
// import { useParams } from 'react-router-dom';


// function CommentEdit({ editCommentFormData, handleCommentFormChange, updatedContent }) {
//   const dispatch = useDispatch();
//   const { id } = useParams();
//   const comments = useSelector(state => state.comments)
//   const [commentId, setCommentId] = useState(null);
//   const [commentContent, setCommentContent] = useState(null);

//   // let editedContent = (e) => { editedContent[content] = e.target.value };
//   const data = {
//     eventId: id,
//   };

//   useEffect(() => {
//     dispatch(getComments(data));

//   }, [])


//   const commentData = {
//     commentId,
//     commentContent
//   }

//   const handleEditFormSave = (e) => {
//     e.preventDefault();
//     const commentId = e.target.value;
//     const commentContent = e.target.value;
//     console.log('handle save works', commentContent)

//   }


//   return (
//     <tr>
//       <td>
//         <input
//           type='text'
//           required
//           placeholder={editCommentFormData.content}
//           attribute='content'
//           value={comments?.content}
//           onChange={handleCommentFormChange}
//         />
//       </td>
//       <td>
//         <button value={comments?.id} onClick={handleEditFormSave}>Save</button>
//         {/* <button value={comment?.id} onClick={handleDelete}>Delete</button> */}
//       </td>
//     </tr>
//   )
// }

// export default CommentEdit;
