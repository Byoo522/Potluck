import { useEffect } from 'react';
import { getComments } from '../../store/comment'
import { useDispatch, useSelector } from 'react-redux'


function CommentForm() {


  return(
    <div>
      <form>
        <input
        type='text-area'
        placeholder='Add a comment...'
        />
        <button>Post</button>
      </form>
    </div>
  )
}

export default CommentForm;
