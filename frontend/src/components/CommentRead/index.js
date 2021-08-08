import React from 'react'


function CommentRead({ comment, handleEditClick }) {


  return (
    <tr>
      <td>
        {comment?.content}
      </td>
      <td>
        <button type='button' onClick={(e) => handleEditClick(e, comment)}>Edit</button>
      </td>
    </tr>
  )
}

export default CommentRead
