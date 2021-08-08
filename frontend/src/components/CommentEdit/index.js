import React from 'react';

function CommentEdit({ editCommentFormData, handleCommentFormChange }) {

  return (
    <tr>
      <td>
        <input
          type='text'
          required
          placeholder='Revise Comment...'
          attribute='content'
          value={editCommentFormData.content}
          onChange={handleCommentFormChange}
        />
      </td>
      <td>
        <button type='submit'>Save</button>
        {/* <button value={comment?.id} onClick={handleDelete}>Delete</button> */}
      </td>
    </tr>
  )
}

export default CommentEdit;
